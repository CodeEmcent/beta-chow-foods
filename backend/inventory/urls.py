from django.urls import path
from .views import LowStockView

urlpatterns = [
    path("low-stock/", LowStockView.as_view(), name="low-stock"),
]
