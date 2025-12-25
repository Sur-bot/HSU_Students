import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDanhSachLop } from "../../../redux/lectorRedux/lopGiangVienSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DanhSachLopGiangVienScreen({ navigation }) {
  const dispatch = useDispatch();

  const { danhSachLop, loading, error } = useSelector(
    (state) => state.lopGiangVien
  );

  useEffect(() => {
    dispatch(fetchDanhSachLop());
  }, [dispatch]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.maLop}>{item.MaLop}</Text>
          <View
            style={[
              styles.status,
              item.TrangThai === "DangMo"
                ? styles.open
                : styles.close,
            ]}
          >
            <Text style={styles.statusText}>
              {item.TrangThai === "DangMo" ? "Đang mở" : "Đóng"}
            </Text>
          </View>
        </View>

        <Text style={styles.tenMH}>{item.TenMH}</Text>

        <View style={styles.footer}>
          <MaterialCommunityIcons
            name="account-group"
            size={18}
            color="#555"
          />
          <Text style={styles.soLuong}>
            {item.SoLuongSinhVien} sinh viên
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0a57a1" />
        <Text>Đang tải danh sách lớp...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={danhSachLop}
        keyExtractor={(item, index) =>
          item.MaLop + "_" + index
        }
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không có lớp nào đang giảng dạy
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  maLop: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0a57a1",
  },
  tenMH: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
    color: "#333",
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  open: {
    backgroundColor: "#e3f6ec",
  },
  close: {
    backgroundColor: "#fdecea",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  soLuong: {
    marginLeft: 6,
    fontSize: 13,
    color: "#555",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 14,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
});

