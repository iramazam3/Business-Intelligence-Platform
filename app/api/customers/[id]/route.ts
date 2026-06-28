import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        region: body.region,
      },
    });

    return NextResponse.json(customer);
  } catch {
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 400 },
    );
  }
}
