import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalCustomers,
      totalProducts,
      totalOrders,
      revenueAggregate,
      monthlyOrders,
      productRevenue,
      customerRevenue,
      ordersByStatus,
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
        _avg: {
          totalAmount: true,
        },
      }),
      prisma.order.findMany({
        select: {
          orderDate: true,
          totalAmount: true,
        },
      }),
      prisma.order.groupBy({
        by: ["productId"],
        _sum: {
          totalAmount: true,
        },
        orderBy: {
          _sum: {
            totalAmount: "desc",
          },
        },
      }),
      prisma.order.groupBy({
        by: ["customerId"],
        _sum: {
          totalAmount: true,
        },
        orderBy: {
          _sum: {
            totalAmount: "desc",
          },
        },
      }),
      prisma.order.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),
    ]);

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        company: true,
      },
    });

    // Monthly Revenue
    const monthlyRevenueMap = new Map<string, number>();

    monthlyOrders.forEach((order) => {
      const key = order.orderDate.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      monthlyRevenueMap.set(
        key,
        (monthlyRevenueMap.get(key) ?? 0) + Number(order.totalAmount),
      );
    });

    const monthlyRevenue = Array.from(monthlyRevenueMap.entries()).map(
      ([month, revenue]) => ({
        month,
        revenue,
      }),
    );

    // Revenue by Product
    const revenueByProduct = productRevenue.map((item) => ({
      product:
        products.find((p) => p.id === item.productId)?.name ??
        "Unknown Product",
      revenue: Number(item._sum.totalAmount ?? 0),
    }));

    // Top Customers
    const topCustomers = customerRevenue.slice(0, 5).map((item) => ({
      customer:
        customers.find((c) => c.id === item.customerId)?.company ??
        "Unknown Customer",
      revenue: Number(item._sum.totalAmount ?? 0),
    }));

    // Orders by Status
    const formattedOrdersByStatus = Object.values(OrderStatus).map((status) => {
      const found = ordersByStatus.find((o) => o.status === status);

      return {
        status,
        count: found?._count.status ?? 0,
      };
    });

    const highestRevenueProduct = revenueByProduct[0] ?? null;
    const bestCustomer = topCustomers[0] ?? null;

    const pendingOrders =
      formattedOrdersByStatus.find((s) => s.status === "Pending")?.count ?? 0;

    // Revenue Trend
    const sortedMonths = [...monthlyRevenue].sort(
      (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime(),
    );

    const latestRevenue = sortedMonths[sortedMonths.length - 1]?.revenue ?? 0;

    const previousRevenue = sortedMonths[sortedMonths.length - 2]?.revenue ?? 0;

    const revenueTrend =
      previousRevenue === 0
        ? 0
        : Number(
            (
              ((latestRevenue - previousRevenue) / previousRevenue) *
              100
            ).toFixed(2),
          );

    return NextResponse.json({
      totalRevenue: Number(revenueAggregate._sum.totalAmount ?? 0),
      totalOrders,
      averageOrderValue: Number(revenueAggregate._avg.totalAmount ?? 0),
      totalCustomers,
      totalProducts,
      monthlyRevenue: sortedMonths,
      revenueByProduct,
      topCustomers,
      ordersByStatus: formattedOrdersByStatus,
      highestRevenueProduct,
      bestCustomer,
      pendingOrders,
      revenueTrend,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch analytics",
      },
      {
        status: 500,
      },
    );
  }
}
