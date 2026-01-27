from django.db import models
from menu.models import MenuItem

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=120)
    unit = models.CharField(max_length=50)
    current_qty = models.DecimalField(max_digits=10, decimal_places=2)
    low_stock_threshold = models.DecimalField(max_digits=10, decimal_places=2)

class StockMovement(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    movement_type = models.CharField(max_length=10, choices=[("IN","IN"),("OUT","OUT")])
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class Recipe(models.Model):
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity_required = models.DecimalField(max_digits=10, decimal_places=2)
