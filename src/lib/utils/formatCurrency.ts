// export const formatCurrency = (value: unknown) => {
//     const amount = Number(value)
//     return new Intl.NumberFormat("en-NG", {
//       style: "currency",
//       currency: "NGN",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };
  

  export const formatCurrency = (value:unknown, currency:string = 'ngn') => {
    const amount = Number(value)
    if (isNaN(amount)) return amount;
    if (currency.toLowerCase() === 'ngn') {
      return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN',  }).format(+amount);
    }
    if (currency.toLowerCase() === 'usd') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(+amount);
    }
    return amount;
  };