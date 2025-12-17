import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjectsByStudent } from "../../../redux/subjectSlice";

export default function DanhSachMonHocScreen() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { subjects, loading, error } = useSelector((state) => state.subject);

  useEffect(() => {
    if (user?.maSV) {
      dispatch(fetchSubjectsByStudent(user.maSV));
    }
  }, [dispatch, user?.maSV]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Đang tải danh sách môn học...</Text>
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

  if (!loading && subjects.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Chưa đăng ký môn học nào</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.MaMH}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.TenMH}</Text>
            <Text>Số tín chỉ: {item.SoTinChi}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0a57a1",
    marginBottom: 4,
  },
});
