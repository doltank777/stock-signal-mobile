import apiClient from "./apiClient";

export type FavoriteResponse = {
  id: number;
  stockCode: string;
  stockName: string;
  marketType: "KOSPI" | "KOSDAQ" | "KONEX";
};

export const getFavorites = async (): Promise<FavoriteResponse[]> => {
  const response = await apiClient.get("/api/favorites");
  return response.data;
};

export const addFavorite = async (stockCode: string): Promise<void> => {
  await apiClient.post(`/api/favorites/${stockCode}`);
};

export const removeFavorite = async (stockCode: string): Promise<void> => {
  await apiClient.delete(`/api/favorites/${stockCode}`);
};