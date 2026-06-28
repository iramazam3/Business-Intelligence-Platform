import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        product: true,
      },
      orderBy: { orderDate: "desc" },
    });

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.findUnique({
      where: { id: body.productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const quantity = Number(body.quantity);
    const unitPrice = Number(product.price);
    const totalAmount = quantity * unitPrice;

    const order = await prisma.order.create({
      data: {
        customerId: body.customerId,
        productId: body.productId,
        quantity,
        unitPrice,
        totalAmount,
        status: body.status,
        orderDate: body.orderDate ? new Date(body.orderDate) : new Date(),
      },
      include: {
        customer: true,
        product: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 400 },
    );
  }
}
