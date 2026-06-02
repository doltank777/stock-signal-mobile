import apiClient from "./apiClient";

export type StockSearchResponse = {
  id: number;
  stockCode: string;
  stockName: string;
  marketType: "KOSPI" | "KOSDAQ" | "KONEX";
};

export type StockDetailResponse = {
  id: number;
  stockCode: string;
  stockName: string;
  marketType: "KOSPI" | "KOSDAQ" | "KONEX";
};

export const searchStocks = async (
  keyword: string
): Promise<StockSearchResponse[]> => {
  const response = await apiClient.get("/api/stocks/search", {
    params: { keyword },
  });

  return response.data;
};

export const getStock = async (
  stockCode: string
): Promise<StockDetailResponse> => {
  const response = await apiClient.get(`/api/stocks/${stockCode}`);

  return response.data;
};

export type StockLatestPriceResponse = {
  id: number;
  stockCode: string;
  currentPrice: number;
  changeRate: number;
  volume: number;
  tradeDate: string;
  collectedAt: string;
};

export const getLatestPrice = async (
  stockCode: string
): Promise<StockLatestPriceResponse> => {
  const response = await apiClient.get(
    `/api/stocks/${stockCode}/price/latest`
  );

  return response.data;
};