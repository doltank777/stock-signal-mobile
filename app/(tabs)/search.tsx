import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  searchStocks,
  StockSearchResponse,
} from "../../src/api/stockApi";

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");
  const [stocks, setStocks] = useState<StockSearchResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setStocks([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      const result = await searchStocks(trimmedKeyword);
      setStocks(result);
    } catch (error) {
      console.error(error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  // const moveToDetail = (stock: StockSearchResponse) => {
  //   router.push(`/stock/${stock.stockCode}`);
  // };
  const moveToDetail = (stock: StockSearchResponse) => {
    router.push({
      pathname: "/stock/[code]",
      params: {
        code: stock.stockCode,
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>종목 검색</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="종목명 또는 종목코드 입력"
          value={keyword}
          onChangeText={setKeyword}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />

        <Pressable
          style={styles.searchButton}
          onPress={handleSearch}
        >
          <Text style={styles.searchButtonText}>검색</Text>
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={stocks}
          keyExtractor={(item) => item.stockCode}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text>
                {searched
                  ? "검색 결과가 없습니다."
                  : "종목명을 검색해보세요."}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => moveToDetail(item)}
            >
              <View>
                <Text style={styles.stockName}>
                  {item.stockName}
                </Text>

                <Text style={styles.stockCode}>
                  {item.stockCode}
                </Text>
              </View>

              <Text style={styles.marketType}>
                {item.marketType}
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stockName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stockCode: {
    marginTop: 4,
    color: "#666",
  },
  marketType: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  center: {
    marginTop: 80,
    alignItems: "center",
  },
});