import { StyleSheet } from "react-native";
import { colors, radius } from "./theme";

export const signalListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.text,
  },
  pageDescription: {
    marginTop: 6,
    fontSize: 14,
    color: colors.subText,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    color: colors.subText,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 14,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  stockName: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  stockCode: {
    marginTop: 4,
    fontSize: 13,
    color: colors.subText,
  },
  badge: {
    backgroundColor: colors.badgeBg,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.badgeText,
  },
  message: {
    marginTop: 14,
    fontSize: 15,
    color: "#374151",
  },
  priceRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: colors.mutedText,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  changeRate: {
    fontSize: 16,
    fontWeight: "800",
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
  date: {
    marginTop: 16,
    fontSize: 12,
    color: colors.mutedText,
    textAlign: "right",
  },
  emptyBox: {
    marginTop: 80,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
  },
  emptyText: {
    marginTop: 8,
    color: colors.mutedText,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  logoutButton: {
    backgroundColor: "#fee2e2",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  logoutText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "800",
  },  
});