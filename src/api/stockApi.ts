import apiClient from "./apiClient";

export type StockSearchResponse = {
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