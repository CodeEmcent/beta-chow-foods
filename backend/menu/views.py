from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend

from .models import Category, MenuItem
from .serializers import CategorySerializer, MenuItemSerializer

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser]

class MenuItemListCreateView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.select_related("category").filter(is_deleted=False)
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.IsAdminUser]

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["category", "is_available"]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "name", "updated_at"]
    ordering = ["category__sort_order", "name"]


class MenuItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.filter(is_deleted=False)
    # queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.is_deleted = True
        obj.deleted_at = timezone.now()
        obj.is_available = False
        obj.save(update_fields=["is_deleted", "deleted_at", "is_available"])
        return Response(status=status.HTTP_204_NO_CONTENT)



class MenuItemBulkActionView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        action = request.data.get("action")
        ids = request.data.get("ids", [])
        payload = request.data.get("payload", {})

        qs = MenuItem.objects.filter(id__in=ids, is_deleted=False)

        if action == "enable":
            qs.update(is_available=True)
        elif action == "disable":
            qs.update(is_available=False)
        elif action == "delete":
            from django.utils import timezone
            qs.update(is_deleted=True, deleted_at=timezone.now(), is_available=False)
        elif action == "set_category":
            category_id = payload.get("category_id")
            qs.update(category_id=category_id)
        elif action == "inc_price":
            # payload: {"amount": 500}
            amount = payload.get("amount", 0)
            for item in qs:
                item.price = item.price + amount
                item.save(update_fields=["price"])
        elif action == "pct_price":
            # payload: {"percent": 10} => +10%
            percent = payload.get("percent", 0)
            for item in qs:
                item.price = item.price * (1 + (percent / 100))
                item.save(update_fields=["price"])
        else:
            return Response({"error": "Invalid action"}, status=400)

        return Response({"status": "ok"})
    

class PublicCategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class PublicMenuItemListView(generics.ListAPIView):
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return MenuItem.objects.select_related("category").filter(
            is_deleted=False,
            is_available=True
        )
