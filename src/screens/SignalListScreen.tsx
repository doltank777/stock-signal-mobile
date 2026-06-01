import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import { Alert } from "react-native";
import { removeAccessToken } from "../storage/tokenStorage";

import { getSignals } from "../api/signalApi";
import { Signal } from "../types/signal";

import { signalListStyles as styles } from "../styles/signalListStyles";


export default function SignalListScreen() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSignals();
  }, []);

  const handleLogout = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          await removeAccessToken();
          router.replace("/login");
        },
      },
    ]);
  };
  
  const loadSignals = async () => {
    try {
      const data = await getSignals();
      setSignals(data);
    } catch (error) {
      console.error("Signal 조회 실패", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadSignals();
  };

  const formatDate = (value: string) => {
    return value.replace("T", " ").substring(0, 16);
  };

  const getSignalLabel = (type: string) => {
    if (type === "VOLUME_SPIKE") return "거래량 급증";
    if (type === "MOVING_AVERAGE_BREAKOUT") return "이동평균 돌파";
    return type;
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>추천 Signal을 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>추천 Signal</Text>
          <Text style={styles.pageDescription}>
            조건 분석으로 감지된 종목입니다.
          </Text>
        </View>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={signals}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>추천 Signal이 없습니다.</Text>
            <Text style={styles.emptyText}>조건에 맞는 종목이 감지되면 표시됩니다.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isPositive = item.changeRatePercent >= 0;

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/signal/[id]",
                  params: {
                    id: item.id,
                    stockCode: item.stockCode,
                    stockName: item.stockName,
                    signalType: item.signalType,
                    message: item.message,
                    baseValue: item.baseValue,
                    currentValue: item.currentValue,
                    changeRatePercent: item.changeRatePercent,
                    detectedAt: item.detectedAt,
                  },
                })
              }
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.stockName}>{item.stockName}</Text>
                  <Text style={styles.stockCode}>{item.stockCode}</Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {getSignalLabel(item.signalType)}
                  </Text>
                </View>
              </View>

              <Text style={styles.message}>{item.message}</Text>

              <View style={styles.priceRow}>
                <View>
                  <Text style={styles.label}>기준값</Text>
                  <Text style={styles.value}>
                    {item.baseValue.toLocaleString()}
                  </Text>
                </View>

                <View>
                  <Text style={styles.label}>현재값</Text>
                  <Text style={styles.value}>
                    {item.currentValue.toLocaleString()}
                  </Text>
                </View>

                <View>
                  <Text style={styles.label}>변화율</Text>
                  <Text
                    style={[
                      styles.changeRate,
                      isPositive ? styles.positive : styles.negative,
                    ]}
                  >
                    {isPositive ? "+" : ""}
                    {item.changeRatePercent}%
                  </Text>
                </View>
              </View>

              <Text style={styles.date}>{formatDate(item.detectedAt)}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
