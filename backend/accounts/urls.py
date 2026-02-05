from django.urls import path
from .views import CustomerListView, CustomerToggleActiveView, CustomerSignupView, CustomerProfileView

urlpatterns = [
    path("customers/", CustomerListView.as_view()),
    path("customers/<int:pk>/toggle/", CustomerToggleActiveView.as_view()),
    path("signup/", CustomerSignupView.as_view()),
    path("profile/", CustomerProfileView.as_view()),
]
