// ✅ Money formatter (NGN with commas + 2 decimals)

export const formatMoney = (amount) =>
  Number(amount).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
