import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonHocGiangVien } from "../../../redux/lectorRedux/monHocGiangVienSlice";
import { clearMonHoc } from "../../../redux/lectorRedux/monHocGiangVienSlice";

const DanhSachMonHocScreen = () => {
  const dispatch = useDispatch();

  // Lấy thông tin user từ authSlice
  const { user } = useSelector((state) => state.auth);
  const { monHoc, loading, error } = useSelector(
    (state) => state.monHocGiangVien
  );

  useEffect(() => {
    if (user?.maGV) {
      dispatch(fetchMonHocGiangVien(user.maGV));
    }

    return () => dispatch(clearMonHoc());
  }, [user?.maGV, dispatch]);

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>
          Bạn chưa đăng nhập. Vui lòng đăng nhập để xem danh sách môn học.
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải danh sách môn học...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Lỗi khi tải dữ liệu:{" "}
          {typeof error === "string" ? error : JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  if (!monHoc || monHoc.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Không có dữ liệu môn học cho giảng viên này.</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.monHoc}>
        {item.TenMH} ({item.TenLop})
      </Text>
      <Text>
        Học kỳ: {item.HocKy} | Năm học: {item.NamHoc}
      </Text>
      <Text>
        Thứ: {item.Thu} | Tiết bắt đầu: {item.TietBatDau} | Số tiết:{" "}
        {item.SoTiet}
      </Text>
      <Text>Phòng học: {item.PhongHoc}</Text>
    </View>
  );

  return (
    <FlatList
      data={monHoc}
      keyExtractor={(item) => item.MaTKB.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  monHoc: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default DanhSachMonHocScreen;
