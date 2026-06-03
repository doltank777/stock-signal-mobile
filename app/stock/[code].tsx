import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../../src/api/favoriteApi";
import {
  getLatestPrice,
  getStock,
  StockDetailResponse,
  StockLatestPriceResponse,
} from "../../src/api/stockApi";
import { stockDetailStyles as styles } from "../../src/styles/stockDetailStyles";

export default function StockDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();

  const [stock, setStock] = useState<StockDetailResponse | null>(null);
  const [price, setPrice] = useState<StockLatestPriceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const fetchStockDetail = async () => {
    if (!code) return;

    try {
      setLoading(true);

      const [stockResult, priceResult, favoritesResult] = await Promise.all([
        getStock(code),
        getLatestPrice(code),
        getFavorites(),
      ]);

      setStock(stockResult);
      setPrice(priceResult);

      const isFavorite = favoritesResult.some(
        (item) => item.stockCode === code
      );

      setFavorite(isFavorite);
    } catch (error) {
      console.error("종목 상세 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!stock || favoriteLoading) return;

    try {
      setFavoriteLoading(true);

      if (favorite) {
        await removeFavorite(stock.stockCode);
        setFavorite(false);
      } else {
        await addFavorite(stock.stockCode);
        setFavorite(true);
      }
    } catch (error) {
      console.error("관심종목 처리 실패", error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const formatNumber = (value?: number | null) => {
    if (value === undefined || value === null) return "-";
    return value.toLocaleString();
  };

  const formatDateTime = (value?: string | null) => {
    if (!value) return "-";
    return value.replace("T", " ").slice(0, 19);
  };

  useEffect(() => {
    fetchStockDetail();
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

        <Pressable
          style={[
            styles.favoriteButton,
            favorite && styles.favoriteButtonActive,
          ]}
          onPress={handleToggleFavorite}
          disabled={favoriteLoading}
        >
          <Text
            style={[
              styles.favoriteButtonText,
              favorite && styles.favoriteButtonTextActive,
            ]}
          >
            {favoriteLoading
              ? "처리 중..."
              : favorite
                ? "관심종목 해제"
                : "관심종목 추가"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>최신 현재가</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>현재가</Text>
          <Text style={styles.value}>{formatNumber(price?.currentPrice)}원</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>등락률</Text>
          <Text style={styles.value}>{price?.changeRate ?? "-"}%</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>거래량</Text>
          <Text style={styles.value}>{formatNumber(price?.volume)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>거래일</Text>
          <Text style={styles.value}>{price?.tradeDate ?? "-"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>수집시간</Text>
          <Text style={styles.value}>{formatDateTime(price?.collectedAt)}</Text>
        </View>
      </View>
    </View>
  );
}