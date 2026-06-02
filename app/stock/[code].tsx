import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Text,
    View,
} from "react-native";

import {
    getStock,
    StockDetailResponse,
} from "../../src/api/stockApi";
import { stockDetailStyles as styles } from "../../src/styles/stockDetailStyles";

export default function StockDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();

  const [stock, setStock] = useState<StockDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStock = async () => {
    if (!code) return;

    try {
      setLoading(true);
      const result = await getStock(code);
      setStock(result);
    } catch (error) {
      console.error("종목 상세 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, [code]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>종목 정보를 불러오는 중입니다.</Text>
      </View>
    );
  }

  if (!stock) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>종목 정보를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>종목 상세</Text>

      <View style={styles.card}>
        <Text style={styles.stockName}>{stock.stockName}</Text>
        <Text style={styles.stockCode}>{stock.stockCode}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>시장구분</Text>
          <Text style={styles.value}>{stock.marketType}</Text>
        </View>
      </View>
    </View>
  );
}