from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.timezone import now
from django.db.models import Sum, Count
from .models import Order
from .serializers import OrderCreateSerializer, OrderPublicSerializer, OrderAdminSerializer


class CreateOrderView(generics.GenericAPIView):
    serializer_class = OrderCreateSerializer

    def post(self, request, *args, **kwargs):
        ser = self.get_serializer(data=request.data)
        ser.is_valid(raise_exception=True)
        order = ser.save()
        return Response({"order_no": order.order_no}, status=status.HTTP_201_CREATED)


class TrackOrderView(generics.RetrieveAPIView):
    lookup_field = "order_no"
    queryset = Order.objects.all()
    serializer_class = OrderPublicSerializer


class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderAdminSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        qs = Order.objects.all()

        status = self.request.query_params.get("status")
        start = self.request.query_params.get("start")
        end = self.request.query_params.get("end")

        if status:
            qs = qs.filter(status=status)

        if start and end:
            qs = qs.filter(created_at__date__range=[start, end])

        return qs


class AdminOrderDetailView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderAdminSerializer
    lookup_field = "id"
    permission_classes = [IsAuthenticated]


class SalesSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = now().date()

        qs = Order.objects.filter(created_at__date=today)

        total_orders = qs.count()
        completed_orders = qs.filter(status=Order.STATUS_COMPLETED).count()
        pending_orders = qs.exclude(status=Order.STATUS_COMPLETED).count()
        total_revenue = qs.aggregate(total=Sum("total"))["total"] or 0

        return Response({
            "total_orders": total_orders,
            "completed_orders": completed_orders,
            "pending_orders": pending_orders,
            "total_revenue": total_revenue,
        })
