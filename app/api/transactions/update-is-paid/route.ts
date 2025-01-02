import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_lib/prisma"; // Ajuste o caminho conforme necessário

export async function POST(req: NextRequest) {
  try {
    const { id, isPaid } = await req.json();

    if (!id || typeof isPaid !== "boolean") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const updatedTransaction = await db.transaction.update({
      where: { id },
      data: { isPaid },
    });

    return NextResponse.json({
      success: true,
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
