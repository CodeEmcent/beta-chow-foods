from django.urls import path
from .views import (
    CategoryListView,
    MenuItemListCreateView,
    MenuItemDetailView,
)

urlpatterns = [
    path("categories/", CategoryListView.as_view()),
    path("items/", MenuItemListCreateView.as_view()),
    path("items/<int:pk>/", MenuItemDetailView.as_view()),
]
