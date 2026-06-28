import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingOrder = await prisma.order.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const quantity = body.quantity
      ? Number(body.quantity)
      : existingOrder.quantity;

    const unitPrice = Number(existingOrder.unitPrice);
    const totalAmount = quantity * unitPrice;

    const order = await prisma.order.update({
      where: { id },
      data: {
        quantity,
        totalAmount,
        status: body.status ?? existingOrder.status,
        orderDate: body.orderDate
          ? new Date(body.orderDate)
          : existingOrder.orderDate,
      },
      include: {
        customer: true,
        product: true,
      },
    });

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 400 },
    );
  }
}
