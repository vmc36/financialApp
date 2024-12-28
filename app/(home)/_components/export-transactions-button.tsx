"use client";

import * as XLSX from "xlsx";

const ExportTransactionsButton = ({
  transactions,
}: {
  transactions: { name: string; date: string; type: string; amount: number }[];
}) => {
  const handleExportToExcel = () => {
    const dataToExport = transactions.map((transaction) => ({
      "Despesa:": transaction.name,
      "Vencimento:": new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      "Tipo:": transaction.type,
      "Valor:": transaction.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resumo Mensal");
    XLSX.writeFile(workbook, "last-transactions.xlsx");
  };

  return (
    <button
      onClick={handleExportToExcel}
      className="sm:hidden rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-3 py-2 text-center text-sm font-medium text-white transition-all hover:bg-gradient-to-br hover:duration-100 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
    >
      Exel export
    </button>
  );
};

export default ExportTransactionsButton;
