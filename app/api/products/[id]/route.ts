import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        category: body.category,
        price: body.price,
        stockQuantity: body.stockQuantity,
      },
    });

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 400 },
    );
  }
}
