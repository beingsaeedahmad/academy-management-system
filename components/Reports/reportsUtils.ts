export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  export function formatPercentage(value: number) {
    return `${Math.round(value)}%`;
  }
  
  export function calculatePercentage(
    value: number,
    total: number
  ) {
    if (!total) return 0;
  
    return Math.round((value / total) * 100);
  }