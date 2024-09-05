export interface ExchangeRates {
  [key: string]: number;
}

export interface ApiResponse {
  success: boolean;
  rates: {
    USD: number;
    EUR: number;
    UAH: number;
  };
  error?: string;
}
