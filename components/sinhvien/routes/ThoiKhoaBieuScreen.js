//man hinh hien thi thoi khoa bieu cua sinh vien
import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchScheduleByStudent } from "../../../redux/scheduleSlice";

export default function ThoiKhoaBieuScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { schedule, loading, error } = useSelector((state) => state.schedule);

  useEffect(() => {
    if (user?.maSV) {
      dispatch(fetchScheduleByStudent(user.maSV));
    }
  }, [dispatch, user?.maSV]);
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Đang tải thời khóa biểu...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }
  //khong co tkb
  if (!schedule || schedule.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Chưa có thời khóa biểu</Text>
      </View>
    );
  }
  //co tkb
  return (
    <FlatList
      data={schedule}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.subject}>{item.TenMH}</Text>
          <Text>
            Thứ: {item.Thu}, Tiết: {item.TietBatDau} - {item.SoTiet}
          </Text>
          <Text>Phòng: {item.PhongHoc}</Text>
          <Text>Giảng viên: {item.GiangVien}</Text>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subject: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0a57a1",
    marginBottom: 4,
  },
});
