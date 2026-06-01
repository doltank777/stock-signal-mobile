import { StyleSheet } from "react-native";
import { colors, radius } from "./theme";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: colors.subText,
    marginBottom: 32,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },
});