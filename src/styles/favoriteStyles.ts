import { StyleSheet } from "react-native";

export const favoriteStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    color: "#666",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  emptyBox: {
    marginTop: 80,
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 15,
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
});