import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "accessToken";

export const saveAccessToken = async (token: string) => {
  await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = async () => {
  return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
};