import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

import {
  FavoriteResponse,
  getFavorites,
} from "../../src/api/favoriteApi";
import { favoriteStyles as styles } from "../../src/styles/favoriteStyles";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = async () => {
    try {
      const result = await getFavorites();
      setFavorites(result);
    } catch (error) {
      console.error("관심종목 조회 실패", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchFavorites();
    }, [])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchFavorites();
  };

  const moveToDetail = (stockCode: string) => {
    router.push({
      pathname: "/stock/[code]",
      params: { code: stockCode },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>관심종목을 불러오는 중입니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>관심 종목</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>등록된 관심종목이 없습니다.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => moveToDetail(item.stockCode)}
          >
            <View>
              <Text style={styles.stockName}>{item.stockName}</Text>
              <Text style={styles.stockCode}>{item.stockCode}</Text>
            </View>

            <Text style={styles.marketType}>{item.marketType}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}