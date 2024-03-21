export const formatMoney = (value: string) => {
  const numericValue = value.replace(/[^0-9]/g, '');

  const floatValue = parseFloat(numericValue) / 100;

  return floatValue.toFixed(2);
};
