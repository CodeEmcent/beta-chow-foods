from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.utils.timezone import now
from django.core.exceptions import ValidationError
from django.db.models import Sum, Count
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from .models import Order
from .serializers import ( 
    OrderCreateSerializer, OrderPublicSerializer, 
    OrderAdminSerializer, CustomerOrderHistorySerializer
)
from .analytics import get_admin_analytics
from django.conf import settings

class CreateOrderView(generics.GenericAPIView):
    serializer_class = OrderCreateSerializer

    def post(self, request, *args, **kwargs):
        ser = self.get_serializer(data=request.data, context={"request": request})
        ser.is_valid(raise_exception=True)
        order = ser.save()

        return Response(
            {"order_no": order.order_no},
            status=status.HTTP_201_CREATED
        )


class TrackOrderView(generics.RetrieveAPIView):
    lookup_field = "order_no"
    queryset = Order.objects.all()
    serializer_class = OrderPublicSerializer


class AdminOrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderAdminSerializer
    permission_classes = [IsAdminUser]

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
    permission_classes = [IsAdminUser]

    def patch(self, request, *args, **kwargs):
        order = self.get_object()

        new_status = request.data.get("status")
        force = request.data.get("force", False)

        # ✅ Convert force properly
        if isinstance(force, str):
            force = force.lower() == "true"

        if new_status:
            try:
                order.change_status(new_status, force=force)
            except ValidationError as e:
                return Response(
                    {"detail": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SalesSummaryView(APIView):
    permission_classes = [IsAdminUser]

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

@api_view(["POST"])
@permission_classes([IsAdminUser])
def admin_complete_order(request, id):
    order = get_object_or_404(Order, id=id)

    try:
        order.change_status(Order.STATUS_COMPLETED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    serializer = OrderAdminSerializer(order)
    return Response(serializer.data)

class CustomerOrderHistoryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CustomerOrderHistorySerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by("-created_at")


class CustomerOrderDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderPublicSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class AdminAnalyticsDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response(get_admin_analytics())


class WhatsAppOrderCreateView(APIView):
    """
    Creates a real Order in the DB, then returns:
    - order_no
    - whatsapp_url (pre-filled message)
    """
    permission_classes = [AllowAny]

    def post(self, request):
        payload = request.data.copy()

        # Defaults for WhatsApp flow (so it works even without checkout form)
        payload.setdefault("payment_method", Order.PAYMENT_COD)

        # If user didn’t choose, use PICKUP (because DELIVERY requires address)
        payload.setdefault("order_type", Order.TYPE_PICKUP)

        serializer = OrderCreateSerializer(data=payload, context={"request": request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        # Build a WhatsApp message (business number should come from settings)
        # Example: WHATSAPP_BUSINESS_NUMBER="2348012345678"
        business_number = getattr(settings, "WHATSAPP_BUSINESS_NUMBER", "")
        message_lines = [
            "Hello Beta Chow Foods,",
            "I would like to place an order:",
            "",
        ]

        # Add items summary (serializer saved items)
        for item in order.items.all():
            message_lines.append(f"- {item.menu_item.name} x{item.quantity}")

        message_lines += [
            "",
            f"Order No: {order.order_no}",
            f"Order Type: {order.order_type}",
        ]

        if order.delivery_address:
            message_lines.append(f"Delivery Address: {order.delivery_address}")
        if order.landmark:
            message_lines.append(f"Landmark: {order.landmark}")

        message_lines += [
            "",
            "Thank you!",
        ]

        message = "\n".join(message_lines)

        # WhatsApp click-to-chat URL
        # IMPORTANT: WhatsApp expects number with country code and no +
        import urllib.parse
        encoded = urllib.parse.quote(message)
        whatsapp_url = f"https://wa.me/{business_number}?text={encoded}" if business_number else ""

        return Response(
            {
                "order_no": order.order_no,
                "whatsapp_url": whatsapp_url,
                "message": message,  # optional (helps debugging)
            },
            status=status.HTTP_201_CREATED,
        )
