import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
};

export const TRANSACTION_CATEGORY_LABELS = {
  CREDIT_CARD: "Cartão de Crédito",
  INTERNET: "Internet",
  ENTERTAINMENT: "Entretenimento",
  ENERGY_BILL: "Energia",
  FOOD_CARD: "Alimentação",
  FIES: "FIES",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  PHONE_BILL: "Conta telefônica",
  SALARY: "Salário",
  STORE_CARDS: "Cartões de Loja",
  TRANSPORTATION: "Transporte",
  UBER: "UBER",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const TRANSACTION_TYPE_OPTIONS = [
  {
    value: TransactionType.EXPENSE,
    label: "Despesa",
  },
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_TRANSFER],
  },
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.BANK_SLIP],
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CASH],
  },
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.CREDIT_CARD],
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label:
      TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.DEBIT_CARD],
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.OTHER],
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: TRANSACTION_PAYMENT_METHOD_LABELS[TransactionPaymentMethod.PIX],
  },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.CREDIT_CARD,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.CREDIT_CARD],
  },
  {
    value: TransactionCategory.INTERNET,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.INTERNET],
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENTERTAINMENT],
  },
  {
    value: TransactionCategory.ENERGY_BILL,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.ENERGY_BILL],
  },
  {
    value: TransactionCategory.FOOD_CARD,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FOOD_CARD],
  },
  {
    value: TransactionCategory.HEALTH,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HEALTH],
  },
  {
    value: TransactionCategory.HOUSING,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.HOUSING],
  },
  {
    value: TransactionCategory.OTHER,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.OTHER],
  },

  {
    value: TransactionCategory.PHONE_BILL,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.PHONE_BILL],
  },
  {
    value: TransactionCategory.FIES,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.FIES],
  },
  {
    value: TransactionCategory.STORE_CARDS,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.STORE_CARDS],
  },

  {
    value: TransactionCategory.SALARY,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.SALARY],
  },

  {
    value: TransactionCategory.TRANSPORTATION,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.TRANSPORTATION],
  },
  {
    value: TransactionCategory.UBER,
    label: TRANSACTION_CATEGORY_LABELS[TransactionCategory.UBER],
  },
];
