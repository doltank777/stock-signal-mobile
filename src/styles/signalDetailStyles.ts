import { StyleSheet } from "react-native";
import { colors, radius } from "./theme";

export const signalDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.background,
  },
  back: {
    fontSize: 16,
    marginBottom: 24,
    color: colors.primary,
    fontWeight: "700",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
  },
  code: {
    marginTop: 6,
    fontSize: 15,
    color: colors.subText,
  },
  card: {
    marginTop: 24,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 10,
  },
  label: {
    marginTop: 14,
    fontSize: 13,
    color: colors.mutedText,
  },
  value: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  rate: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: "800",
    color: colors.positive,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginTop: 18,
  },
});