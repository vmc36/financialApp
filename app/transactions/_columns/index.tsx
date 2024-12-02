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

// Componente separado para o checkbox
const PaidCheckbox = ({ transaction }: { transaction: Transaction }) => {
  const [isPaid, setIsPaid] = useState(() => {
    // Recupera o valor inicial do localStorage
    const storedValue = localStorage.getItem(
      `transaction-paid-${transaction.id}`,
    );
    return storedValue ? JSON.parse(storedValue) : transaction.paid;
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsPaid(newValue);
    // Salva no localStorage
    localStorage.setItem(
      `transaction-paid-${transaction.id}`,
      JSON.stringify(newValue),
    );
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
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
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
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
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
