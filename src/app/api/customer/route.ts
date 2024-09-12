import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      {
        status: 400,
      },
    );
  }
  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email,
      },
    });
    console.log(customer);
    return NextResponse.json(customer);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching customer" },
      {
        status: 400,
      },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Not Authorized" },
      {
        status: 401,
      },
    );
  }
  if (!userId) {
    return NextResponse.json(
      { error: "Customer ID is required" },
      {
        status: 400,
      },
    );
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId,
    },
  });
  if (findTickets) {
    return NextResponse.json(
      {
        error:
          "Cliente possui tickets abertos, exclua todos os tickets antes de excluir o cliente.",
      },
      {
        status: 400,
      },
    );
  }
  try {
    await prismaClient.customer.delete({ where: { id: userId } });
    return NextResponse.json({ message: "Cliente excluído com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete customer" },
      {
        status: 400,
      },
    );
  }
}

export async function POST(req: Request) {
  const { name, email, phone, address } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Not Authorized" },
      {
        status: 401,
      },
    );
  }
  try {
    await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new customer" },
      {
        status: 400,
      },
    );
  }
}
