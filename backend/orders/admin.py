from django.contrib import admin
from .models import Order, OrderItem, Customer

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("order_no", "status", "order_type", "total", "created_at")
    list_filter = ("status", "order_type")
    search_fields = ("order_no", "customer__phone")
    inlines = [OrderItemInline]

admin.site.register(Customer)
