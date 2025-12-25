import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinhVienGiangVien } from "../../../redux/lectorRedux/sinhVienGiangVienSlice";

export default function DanhSachSinhVienScreen() {
  const dispatch = useDispatch();
  const { danhSachSinhVien, loading, error } = useSelector(
    (state) => state.sinhVienGiangVien
  );

  useEffect(() => {
    dispatch(fetchSinhVienGiangVien());
  }, []);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <FlatList
      data={danhSachSinhVien}
      keyExtractor={(item) => item.MaSV}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.HoTen}</Text>
          <Text>MSSV: {item.MaSV}</Text>
          <Text>Lớp: {item.TenLop}</Text>
          <Text>Email: {item.Email}</Text>
          <Text>Trạng thái: {item.TrangThai}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
