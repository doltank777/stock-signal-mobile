import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { getMe } from "../api/authApi";
import { getAccessToken, removeAccessToken } from "../storage/tokenStorage";
import { loginStyles as styles } from "../styles/loginStyles";

export default function AuthLoadingScreen() {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getAccessToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      await getMe();

      router.replace("/signals");
    } catch (error) {
      await removeAccessToken();

      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.description}>로그인 상태를 확인하는 중...</Text>
    </View>
  );
}