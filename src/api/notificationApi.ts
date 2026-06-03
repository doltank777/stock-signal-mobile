import apiClient from "./apiClient";

type SaveNotificationTokenRequest = {
  token: string;
  platform: "android" | "ios";
};

export async function saveNotificationToken(
  request: SaveNotificationTokenRequest
) {
  await apiClient.post("/api/notification-tokens", request);
}