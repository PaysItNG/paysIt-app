import { CurrencyType } from "./typeConfig";

export const formatCurrency = (
  value: number | string,
  currency: CurrencyType = "NGN"
  // locale = "en-IN"
) => {
  const amount = Number(value);
  if (isNaN(amount)) return value;

  const locale = "en-" + currency?.split("")[0] + currency?.split("")[1];

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  } catch {
    return amount;
  }
};
