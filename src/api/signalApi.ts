import { Signal } from "../types/signal";
import apiClient from "./apiClient";

export const getSignals = async (): Promise<Signal[]> => {
  const response = await apiClient.get("/api/signals");
  return response.data;
};