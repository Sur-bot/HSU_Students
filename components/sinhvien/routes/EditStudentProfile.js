import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentInfo,
  updateStudentInfo,
  clearStudentError,
} from "../../../redux/studentSlice";

export default function EditStudentProfile() {
  const dispatch = useDispatch();

  const maSV = useSelector((state) => state.auth.user?.maSV);
  const { studentInfo, loading, error } = useSelector((state) => state.student);
  const authUser = useSelector((state) => state.auth.user);

  const [diaChi, setDiaChi] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");

  useEffect(() => {
    if (maSV) {
      dispatch(fetchStudentInfo(maSV));
    }
  }, [maSV]);

  const handleSave = () => {
    if (!/^(0[0-9]{9})$/.test(soDienThoai)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
      return;
    }

    dispatch(
      updateStudentInfo({
        MaSV: maSV,
        DiaChi: diaChi,
        SoDienThoai: soDienThoai,
      })
    ).then((res) => {
      if (!res.error) {
        Alert.alert("Thành công", "Cập nhật thông tin thành công");
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!studentInfo) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy thông tin sinh viên</Text>
      </View>
    );
  }

  const isChanged =
    diaChi !== studentInfo?.DiaChi || soDienThoai !== studentInfo?.SoDienThoai;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin sinh viên</Text>
      <TextInput
        value={studentInfo.HoTen || ""}
        editable={false}
        style={styles.disabled}
      />
      <TextInput
        value={studentInfo.Email || ""}
        editable={false}
        style={styles.disabled}
      />
      <TextInput
        value={studentInfo.NgaySinh || ""}
        editable={false}
        style={styles.disabled}
      />
      <TextInput
        value={studentInfo.GioiTinh || ""}
        editable={false}
        style={styles.disabled}
      />
      <TextInput
        value={studentInfo.MaLop?.toString() || ""}
        editable={false}
        style={styles.disabled}
      />

      {/* CHO SỬA */}
      <TextInput
        placeholder="Số điện thoại"
        value={soDienThoai}
        onChangeText={setSoDienThoai}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Địa chỉ"
        value={diaChi}
        onChangeText={setDiaChi}
        style={styles.input}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        title="Lưu thay đổi"
        onPress={handleSave}
        disabled={!isChanged || loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  disabled: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    color: "#777",
  },
  error: { color: "red", marginBottom: 10 },
});
