from django.urls import path
from .views import (
    CreateOrderView, TrackOrderView,
    AdminOrderListView, AdminOrderDetailView,
    SalesSummaryView, admin_complete_order,
    CustomerOrderDetailView, CustomerOrderHistoryView,
    AdminAnalyticsDashboardView, WhatsAppOrderCreateView
)

urlpatterns = [
    path("", CreateOrderView.as_view()),
    path("track/<str:order_no>/", TrackOrderView.as_view()),

    # Customer routes
    path("my/", CustomerOrderHistoryView.as_view()),
    path("my/<int:pk>/", CustomerOrderDetailView.as_view()),

    # Admin routes
    path("admin/", AdminOrderListView.as_view()),
    path("admin/<int:id>/", AdminOrderDetailView.as_view()),
    path("admin/<int:id>/complete/", admin_complete_order),
    path("admin/summary/", SalesSummaryView.as_view()),

    # Analytics Dashboard
    path("admin/analytics/", AdminAnalyticsDashboardView.as_view(), name="admin-analytics"),

    # ✅ WhatsApp Orders
    path("whatsapp/", WhatsAppOrderCreateView.as_view()),
]
