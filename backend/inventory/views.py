from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db import models

from .models import Ingredient

class LowStockView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        low = Ingredient.objects.filter(
            current_qty__lte=models.F("low_stock_threshold")
        )

        return Response([
            {
                "id": i.id,
                "name": i.name,
                "current_qty": i.current_qty,
                "low_stock_threshold": i.low_stock_threshold,
            }
            for i in low
        ])
