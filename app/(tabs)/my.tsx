import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from "react-native";

import { getMyInfo, MyInfoResponse } from "../../src/api/userApi";
import { removeAccessToken } from "../../src/storage/tokenStorage";
import { myStyles as styles } from "../../src/styles/myStyles";

export default function MyScreen() {
  const [myInfo, setMyInfo] = useState<MyInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMyInfo = async () => {
    try {
      setLoading(true);
      const result = await getMyInfo();
      setMyInfo(result);
    } catch (error) {
      console.error("내 정보 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await removeAccessToken();
    router.replace("/login");
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyInfo();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>내 정보를 불러오는 중입니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 정보</Text>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>이메일</Text>
          <Text style={styles.value}>{myInfo?.email ?? "-"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>닉네임</Text>
          <Text style={styles.value}>{myInfo?.nickname ?? "-"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>권한</Text>
          <Text style={styles.value}>{myInfo?.role ?? "-"}</Text>
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </Pressable>
    </View>
  );
}