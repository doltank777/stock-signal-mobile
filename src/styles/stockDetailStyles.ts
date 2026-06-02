import { StyleSheet } from "react-native";

export const stockDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  emptyText: {
    color: "#666",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },
  stockName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
  stockCode: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoRow: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#666",
    fontSize: 15,
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2563eb",
  },
});