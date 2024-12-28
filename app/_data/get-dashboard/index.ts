import { db } from "@/app/_lib/prisma";
import { TransactionType } from "@prisma/client";
import { TotalExpensePerCategory, TransactionPercentagePerType } from "./types";
import { auth } from "@clerk/nextjs/server";

export const getDashboard = async (year: string, month: string) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  endDate.setDate(0);

  const where = {
    userId,
    date: {
      gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
      lte: new Date(`${year}-${month}-31T23:59:59.999Z`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );
  const balance = depositsTotal - investmentsTotal - expensesTotal;
  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]:
      depositsTotal && transactionsTotal
        ? Math.round(
            (Number(depositsTotal || 0) / Number(transactionsTotal)) * 100,
          ) + "%"
        : "Sem entradas.",
    [TransactionType.EXPENSE]:
      expensesTotal && transactionsTotal
        ? Math.round(
            (Number(expensesTotal || 0) / Number(transactionsTotal)) * 100,
          ) + "%"
        : "Sem entradas.",
    [TransactionType.INVESTMENT]:
      investmentsTotal && transactionsTotal
        ? Math.round(
            (Number(investmentsTotal || 0) / Number(transactionsTotal)) * 100,
          ) + "%"
        : "Sem entradas.",
  };
  const totalExpensePerCategory: TotalExpensePerCategory[] = (
    await db.transaction.groupBy({
      by: ["category"],
      where: {
        ...where,
        type: TransactionType.EXPENSE,
      },
      _sum: {
        amount: true,
      },
    })
  ).map((category) => ({
    category: category.category,
    totalAmount: Number(category._sum.amount),
    percentageOfTotal: Math.round(
      (Number(category._sum.amount) / Number(expensesTotal)) * 100,
    ),
  }));
  const lastTransactions = await db.transaction.findMany({
    where,
    orderBy: { date: "asc" },
    take: 15,
  });
  return {
    balance,
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    typesPercentage,
    totalExpensePerCategory,
    lastTransactions: JSON.parse(JSON.stringify(lastTransactions)),
  };
};
