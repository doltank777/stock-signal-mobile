import apiClient from "./apiClient";

export type MyInfoResponse = {
  email: string;
  nickname: string;
  role: "USER" | "ADMIN";
};

export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const response = await apiClient.get("/api/auth/me");
  return response.data;
};