import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { getAccessToken } from "../storage/tokenStorage";
import { loginStyles as styles } from "../styles/loginStyles";

export default function AuthLoadingScreen() {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await getAccessToken();

    if (token) {
      router.replace("/signals");
    } else {
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