import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingHorizontal: "4%",
  },
  alert: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  title: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3fffa3",
    flexDirection: "row",
    width: "65%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
    color: "#1d1d2e",
  },
});
