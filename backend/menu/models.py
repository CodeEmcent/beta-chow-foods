from django.db import models
from django.utils import timezone

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="items")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True)  # quick MVP (later use ImageField)
    is_available = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    stock_mode = models.CharField(max_length=20, choices=[("unlimited","Unlimited"),("limited","Limited")], default="unlimited")
    stock_qty = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["category__sort_order", "name"]
        unique_together = ("category", "name")

    def __str__(self):
        return f"{self.name} ({self.category.name})"

