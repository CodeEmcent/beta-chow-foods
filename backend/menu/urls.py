from django.urls import path
from .views import (
    CategoryListView,
    MenuItemListCreateView,
    MenuItemDetailView,
    MenuItemBulkActionView,
    PublicCategoryListView,
    PublicMenuItemListView,
)

urlpatterns = [
    path("categories/", CategoryListView.as_view()),
    path("items/", MenuItemListCreateView.as_view()),
    path("items/<int:pk>/", MenuItemDetailView.as_view()),
    path("items/bulk/", MenuItemBulkActionView.as_view()),
    path("public/categories/", PublicCategoryListView.as_view()),
    path("public/items/", PublicMenuItemListView.as_view()),
]
