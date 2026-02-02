from rest_framework import serializers
from .models import Category, MenuItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "sort_order"]

class MenuItemSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )
    category = CategorySerializer(read_only=True)

    class Meta:
        model = MenuItem
        fields = [
            "id",
            "category",
            "category_id",
            "name",
            "description",
            "price",
            "image_url",
            "is_available",
        ]

