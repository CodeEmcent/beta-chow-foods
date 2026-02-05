from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from menu.models import MenuItem
from django.conf import settings


class Customer(models.Model):
    full_name = models.CharField(max_length=160)
    phone = models.CharField(max_length=30)
    email = models.EmailField(blank=True)

    def __str__(self):
        return f"{self.full_name} - {self.phone}"


class Order(models.Model):
    # ---- STATUS CONSTANTS ----
    STATUS_NEW = "NEW"
    STATUS_ACCEPTED = "ACCEPTED"
    STATUS_COOKING = "COOKING"
    STATUS_OUT = "OUT_FOR_DELIVERY"
    STATUS_COMPLETED = "COMPLETED"
    STATUS_CANCELLED = "CANCELLED"

    STATUS_CHOICES = [
        (STATUS_NEW, "New"),
        (STATUS_ACCEPTED, "Accepted"),
        (STATUS_COOKING, "Cooking"),
        (STATUS_OUT, "Out for delivery"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    # ---- ORDER TYPES ----
    TYPE_DELIVERY = "DELIVERY"
    TYPE_PICKUP = "PICKUP"
    TYPE_CHOICES = [(TYPE_DELIVERY, "Delivery"), (TYPE_PICKUP, "Pickup")]

    # ---- PAYMENT ----
    PAYMENT_COD = "PAY_ON_DELIVERY"
    PAYMENT_TRANSFER = "BANK_TRANSFER"
    PAYMENT_CHOICES = [
        (PAYMENT_COD, "Pay on delivery"),
        (PAYMENT_TRANSFER, "Bank transfer"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders")
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name="orders")
    order_no = models.CharField(max_length=20, unique=True)

    order_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=TYPE_DELIVERY)
    delivery_address = models.TextField(blank=True)
    landmark = models.CharField(max_length=200, blank=True)

    payment_method = models.CharField(max_length=30, choices=PAYMENT_CHOICES, default=PAYMENT_COD)
    payment_reference = models.CharField(max_length=120, blank=True)

    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default=STATUS_NEW)

    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    status_changed_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_no

    # ---- VALID STATUS FLOW ----
    STATUS_FLOW = {
        STATUS_NEW: [STATUS_ACCEPTED, STATUS_CANCELLED],
        STATUS_ACCEPTED: [STATUS_COOKING, STATUS_CANCELLED],
        STATUS_COOKING: [STATUS_OUT],
        STATUS_OUT: [STATUS_COMPLETED],
    }

    def change_status(self, new_status):
        if self.status == self.STATUS_COMPLETED:
            raise ValidationError("Completed orders cannot be changed.")

        allowed = self.STATUS_FLOW.get(self.status, [])
        if new_status not in allowed:
            raise ValidationError(
                f"Invalid status transition: {self.status} → {new_status}"
            )

        self.status = new_status

        if new_status == self.STATUS_COMPLETED:
            self.completed_at = timezone.now()

        self.save()


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    menu_item = models.ForeignKey(MenuItem, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.CharField(max_length=300, blank=True)

    def line_total(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return f"{self.menu_item.name} x{self.quantity} ({self.order.order_no})"
