export const formatPriceToNumber = (value: string): number => {
  return Number(
    value
      .split(/(?:\s| )+/)[1]
      .replace(/\./g, '')
      .replace(',', '.'),
  );
};

export const formatNumberToPrice = (value: number): string => {
  const formattedValue = Number(value).toFixed(2);
  const parts = formattedValue.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join(',');
};

type calculateProfitPercentageProps = {
  price: number;
  price_cost: number;
};

export const calculateProfitPercentage = ({
  price,
  price_cost,
}: calculateProfitPercentageProps): string | number => {
  if (!price_cost) return 100;
  const profit = price - price_cost;
  const profitPercentage = (profit / price_cost) * 100;

  const decimalPlaces = (profitPercentage.toString().split('.')[1] || '')
    .length;
  const formattedProfitPercentage =
    decimalPlaces > 2 ? profitPercentage.toFixed(2) : profitPercentage;

  return formattedProfitPercentage;
};
