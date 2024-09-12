import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prismaClient from "@/lib/prisma";

export async function PATCH(req: Request) {
  const { id } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Not Authorized" },
      {
        status: 401,
      },
    );
  }

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });
  if (!findTicket) {
    return NextResponse.json(
      {
        error:
          "Parece que esse ticket já não existe mais, tente atualizar a página ou tente novamente mais tarde",
      },
      {
        status: 400,
      },
    );
  }
  console.log(id, "id");
  try {
    await prismaClient.ticket.update({
      where: {
        id: id,
      },
      data: {
        status: "fechado",
      },
    });
    return NextResponse.json({ message: "Chamado atualizado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao atualizar o ticket" },
      {
        status: 400,
      },
    );
  }
}
