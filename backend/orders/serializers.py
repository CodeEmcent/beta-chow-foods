from decimal import Decimal
from rest_framework import serializers
from .models import Customer, Order, OrderItem
from .utils import generate_order_no
from menu.models import MenuItem


class OrderItemCreateSerializer(serializers.Serializer):
    menu_item_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)
    notes = serializers.CharField(required=False, allow_blank=True)

    def validate_menu_item_id(self, value):
        if not MenuItem.objects.filter(id=value, is_available=True).exists():
            raise serializers.ValidationError("Menu item not found or not available.")
        return value


class OrderCreateSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=160)
    phone = serializers.CharField(max_length=30)
    email = serializers.EmailField(required=False, allow_blank=True)

    order_type = serializers.ChoiceField(choices=Order.TYPE_CHOICES)
    delivery_address = serializers.CharField(required=False, allow_blank=True)
    landmark = serializers.CharField(required=False, allow_blank=True)

    payment_method = serializers.ChoiceField(choices=Order.PAYMENT_CHOICES)
    payment_reference = serializers.CharField(required=False, allow_blank=True)

    delivery_fee = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    items = OrderItemCreateSerializer(many=True)

    def validate(self, attrs):
        if attrs["order_type"] == Order.TYPE_DELIVERY and not attrs.get("delivery_address"):
            raise serializers.ValidationError("Delivery address is required for delivery orders.")
        return attrs

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        delivery_fee = Decimal(validated_data.pop("delivery_fee", "0"))

        customer, _ = Customer.objects.get_or_create(
            full_name=validated_data["full_name"],
            phone=validated_data["phone"],
            defaults={"email": validated_data.get("email", "")},
        )

        order = Order.objects.create(
            customer=customer,
            order_no=generate_order_no(),
            order_type=validated_data["order_type"],
            delivery_address=validated_data.get("delivery_address", ""),
            landmark=validated_data.get("landmark", ""),
            payment_method=validated_data["payment_method"],
            payment_reference=validated_data.get("payment_reference", ""),
            delivery_fee=delivery_fee,
        )

        subtotal = Decimal("0")
        for it in items_data:
            menu_item = MenuItem.objects.get(id=it["menu_item_id"])
            unit_price = Decimal(str(menu_item.price))
            qty = int(it["quantity"])
            subtotal += unit_price * qty

            OrderItem.objects.create(
                order=order,
                menu_item=menu_item,
                quantity=qty,
                unit_price=unit_price,
                notes=it.get("notes", ""),
            )

        order.subtotal = subtotal
        order.total = subtotal + delivery_fee
        order.save(update_fields=["subtotal", "total"])

        return order


class OrderPublicSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            "order_no", "status", "order_type", "delivery_address", "landmark",
            "payment_method", "payment_reference", "subtotal", "delivery_fee", "total",
            "created_at", "customer", "items",
        ]

    def get_customer(self, obj):
        return {"full_name": obj.customer.full_name, "phone": obj.customer.phone, "email": obj.customer.email}

    def get_items(self, obj):
        return [
            {
                "name": i.menu_item.name,
                "quantity": i.quantity,
                "unit_price": str(i.unit_price),
                "notes": i.notes,
            }
            for i in obj.items.all()
        ]


class OrderAdminSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    customer = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = "__all__"

    def get_customer(self, obj):
        return {
            "full_name": obj.customer.full_name,
            "phone": obj.customer.phone,
            "email": obj.customer.email,
        }

    def get_items(self, obj):
        return [
            {
                "id": i.id,
                "name": i.menu_item.name,
                "quantity": i.quantity,
                "unit_price": str(i.unit_price),
                "notes": i.notes,
            }
            for i in obj.items.all()
        ]
