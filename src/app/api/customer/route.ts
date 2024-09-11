import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismaClient from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, phone, address, userId } = await req.json();
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
        userId,
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
