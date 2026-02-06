from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from accounts.auth import CustomTokenSerializer


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer


urlpatterns = [
    path("admin/", admin.site.urls),

    # Accounts
    path("api/accounts/", include("accounts.urls")),

    # Auth (JWT)
    path("api/auth/login/", CustomTokenView.as_view()),
    path("api/auth/refresh/", TokenRefreshView.as_view()),

    # Business modules
    path("api/menu/", include("menu.urls")),
    path("api/orders/", include("orders.urls")),
    path("api/inventory/", include("inventory.urls")),
]
