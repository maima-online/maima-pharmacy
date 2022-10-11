export const currencyConverter = (currency: string, price: number) =>
  new Intl.NumberFormat(`en-NG`, {
    style: "currency",
    currency: currency,
    maximumSignificantDigits: 3,
  }).format(price);
