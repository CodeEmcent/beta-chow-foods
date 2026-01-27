from django.db import models
from menu.models import MenuItem

# Create your models here.

class Customer(models.Model):
    full_name = models.CharField(max_length=160)
    phone = models.CharField(max_length=30)
    email = models.EmailField(blank=True)

    def __str__(self):
        return f"{self.full_name} - {self.phone}"


class Order(models.Model):
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

    TYPE_DELIVERY = "DELIVERY"
    TYPE_PICKUP = "PICKUP"
    TYPE_CHOICES = [(TYPE_DELIVERY, "Delivery"), (TYPE_PICKUP, "Pickup")]

    PAYMENT_COD = "PAY_ON_DELIVERY"
    PAYMENT_TRANSFER = "BANK_TRANSFER"
    PAYMENT_CHOICES = [
        (PAYMENT_COD, "Pay on delivery"),
        (PAYMENT_TRANSFER, "Bank transfer"),
    ]

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

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_no


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
