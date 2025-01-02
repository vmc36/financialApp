"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "../_components/edit-transaction-button";
import DeleteTransactionButton from "../_components/delete-transaction-button";
import { useState } from "react";

const PaidCheckbox = ({ transaction }: { transaction: Transaction }) => {
  const [isPaid, setIsPaid] = useState(transaction.isPaid);

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.checked;
    setIsPaid(newValue);

    try {
      const response = await fetch("/api/transactions/update-is-paid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: transaction.id, isPaid: newValue }),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar o status de pagamento");
      }
    } catch (error) {
      console.error(error);
      setIsPaid(transaction.isPaid); // Reverte o estado em caso de erro
    }
  };
  return (
    <div className="space-x-1">
      <input
        type="checkbox"
        name={`isPaid-${transaction.id}`}
        id={`isPaid-${transaction.id}`}
        checked={isPaid}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: "date",
    header: "Data",

    cell: ({ getValue }) =>
      new Date(getValue<Date>()).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },
  {
    accessorKey: "paid",
    header: "Pago",
    cell: ({ row: { original: transaction } }) => (
      <PaidCheckbox transaction={transaction} />
    ),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      const amountAsNumber = Number(transaction.amount);
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amountAsNumber);
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];
