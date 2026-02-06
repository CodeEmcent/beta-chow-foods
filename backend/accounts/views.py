from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import ( 
    CustomerSerializer, 
    CustomerSignupSerializer,
    CustomerProfileUpdateSerializer
)

class CustomerListView(generics.ListAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(
            is_staff=False,
            is_superuser=False
        ).order_by("-date_joined")


class CustomerToggleActiveView(generics.UpdateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()

    def patch(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = not user.is_active
        user.save()
        return Response(CustomerSerializer(user).data)


class CustomerSignupView(generics.CreateAPIView):
    serializer_class = CustomerSignupSerializer
    permission_classes = [permissions.AllowAny]


class CustomerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(CustomerSerializer(user).data)

    def patch(self, request):
        user = request.user
        serializer = CustomerProfileUpdateSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(CustomerSerializer(user).data)
