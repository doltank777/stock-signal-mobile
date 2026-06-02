import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function StockDetailScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>종목 상세</Text>
      <Text style={styles.code}>종목코드: {code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  code: {
    fontSize: 18,
  },
});