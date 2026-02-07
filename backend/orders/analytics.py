from datetime import timedelta
from dateutil.relativedelta import relativedelta

from django.utils import timezone
from django.db.models import Sum, Count
from django.db.models.functions import TruncDay, TruncMonth

from .models import Order, OrderItem


def get_admin_analytics():
    """
    Returns analytics data for Admin Dashboard.

    Includes:
    - Summary (Today, Week, Month, Year)
    - Status Breakdown
    - Top Selling Items
    - Revenue + Orders Trend (Last 7 Days)
    - Revenue + Orders Trend (Last 12 Months)

    NOTE:
    Only COMPLETED orders are used for revenue calculations.
    """

    now = timezone.now()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    week_start = today_start - timedelta(days=now.weekday())  # Monday
    month_start = today_start.replace(day=1)
    year_start = today_start.replace(month=1, day=1)

    completed_orders = Order.objects.filter(status="COMPLETED")

    def get_summary(start_date):
        qs = completed_orders.filter(created_at__gte=start_date)
        return {
            "orders": qs.count(),
            "revenue": float(qs.aggregate(total=Sum("total"))["total"] or 0),
        }

    # -----------------------------
    # SUMMARY
    # -----------------------------
    summary = {
        "today": get_summary(today_start),
        "week": get_summary(week_start),
        "month": get_summary(month_start),
        "year": get_summary(year_start),
    }

    # -----------------------------
    # STATUS BREAKDOWN (ALL ORDERS)
    # -----------------------------
    status_qs = (
        Order.objects.values("status")
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    status_breakdown = [
        {"status": row["status"], "count": row["count"]}
        for row in status_qs
    ]

    # -----------------------------
    # TOP SELLING ITEMS (COMPLETED ONLY)
    # -----------------------------
    top_items_qs = (
        OrderItem.objects.filter(order__status="COMPLETED")
        .values("menu_item__name")
        .annotate(total_quantity=Sum("quantity"))
        .order_by("-total_quantity")[:5]
    )

    top_items = [
        {"name": row["menu_item__name"], "total_quantity": row["total_quantity"]}
        for row in top_items_qs
    ]

    # -----------------------------
    # DAILY TREND (LAST 7 DAYS)
    # Always return 7 days, even if revenue = 0
    # -----------------------------
    last_7_days_start = today_start - timedelta(days=6)

    daily_sales_qs = (
        completed_orders.filter(created_at__gte=last_7_days_start)
        .annotate(period=TruncDay("created_at"))
        .values("period")
        .annotate(
            revenue=Sum("total"),
            orders=Count("id")
        )
        .order_by("period")
    )

    daily_map = {
        row["period"].date(): {
            "revenue": float(row["revenue"] or 0),
            "orders": row["orders"],
        }
        for row in daily_sales_qs
    }

    trend_daily = []
    for i in range(7):
        day = (last_7_days_start + timedelta(days=i)).date()
        trend_daily.append({
            "period": str(day),
            "revenue": daily_map.get(day, {}).get("revenue", 0),
            "orders": daily_map.get(day, {}).get("orders", 0),
        })

    # -----------------------------
    # MONTHLY TREND (LAST 12 MONTHS)
    # Always return 12 months, even if revenue = 0
    # -----------------------------
    start_12_months = today_start.replace(day=1) - relativedelta(months=11)

    monthly_sales_qs = (
        completed_orders.filter(created_at__gte=start_12_months)
        .annotate(period=TruncMonth("created_at"))
        .values("period")
        .annotate(
            revenue=Sum("total"),
            orders=Count("id")
        )
        .order_by("period")
    )

    monthly_map = {
        row["period"].date(): {
            "revenue": float(row["revenue"] or 0),
            "orders": row["orders"],
        }
        for row in monthly_sales_qs
    }

    trend_monthly = []
    for i in range(12):
        month_date = (start_12_months + relativedelta(months=i)).date()
        trend_monthly.append({
            "period": str(month_date),
            "revenue": monthly_map.get(month_date, {}).get("revenue", 0),
            "orders": monthly_map.get(month_date, {}).get("orders", 0),
        })

    # -----------------------------
    # FINAL RESPONSE
    # -----------------------------
    return {
        "summary": summary,
        "status_breakdown": status_breakdown,
        "top_items": top_items,
        "trend_daily": trend_daily,
        "trend_monthly": trend_monthly,
    }
