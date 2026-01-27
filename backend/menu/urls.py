from django.urls import path
from .views import CategoryListView, MenuItemListView

urlpatterns = [
    path("categories/", CategoryListView.as_view()),
    path("items/", MenuItemListView.as_view()),
]
