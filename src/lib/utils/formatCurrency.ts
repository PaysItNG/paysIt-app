export const formatCurrency = (value: unknown) => {
    const amount = Number(value)
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  