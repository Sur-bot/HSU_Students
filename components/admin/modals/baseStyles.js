import { StyleSheet } from "react-native";
const baseStyles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: "#0a57a1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  rowText: { fontWeight: "600" },
  actions: { flexDirection: "row" },
  edit: { color: "#0a57a1", marginRight: 12 },
  delete: { color: "#e74c3c" },
  close: { textAlign: "center", marginTop: 16, color: "#555" },
});
export default baseStyles;
