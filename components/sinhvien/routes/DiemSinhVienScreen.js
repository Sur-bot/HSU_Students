import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchScoresByStudent } from "../../../redux/scoreSlice";

export default function DiemSinhVienScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);
  const { scores, loading, error } = useSelector((state) => state.score);

  useEffect(() => {
    if (user?.maSV) {
      dispatch(fetchScoresByStudent(user.maSV));
    }
  }, [dispatch, user?.maSV]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Đang tải điểm...</Text>
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

  //khong co diem
  if (!scores || scores.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Chưa có dữ liệu điểm</Text>
      </View>
    );
  }

  //co diem
  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={scores}
        keyExtractor={(item) => item.MaMH}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.subject}>{item.TenMH}</Text>

            <View style={styles.row}>
              <Text>Giữa kỳ: {item.DiemGK ?? "-"}</Text>
              <Text>Cuối kỳ: {item.DiemCK ?? "-"}</Text>
            </View>

            <Text style={styles.avg}>Điểm TB: {item.DiemTB ?? "-"}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  subject: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#0a57a1",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  avg: {
    fontWeight: "700",
    textAlign: "right",
    color: "#27ae60",
  },
});
