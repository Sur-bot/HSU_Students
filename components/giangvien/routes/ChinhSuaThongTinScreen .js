import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGiangVienInfo,
  updateGiangVienPhone,
  resetGiangVienInfo,
} from "../../../redux/lectorRedux/giangVienInfoSlice";

const ChinhSuaThongTinScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const maGV = useSelector((state) => state.auth.user?.maGV);
  const { giangVienInfo, loading, success, error, message } = useSelector(
    (state) => state.giangVienInfo
  );

  const [soDienThoai, setSoDienThoai] = useState("");

  useEffect(() => {
    if (maGV) {
      dispatch(fetchGiangVienInfo(maGV));
    }
  }, [maGV, dispatch]);

  useEffect(() => {
    if (giangVienInfo) {
      setSoDienThoai(giangVienInfo.SoDienThoai || "");
    }
  }, [giangVienInfo]);

  useEffect(() => {
    if (success) {
      Alert.alert("Thành công", message || "Cập nhật số điện thoại thành công");
      dispatch(resetGiangVienInfo());
      navigation.goBack();
    }
  }, [success, message, dispatch, navigation]);

  const handleSave = () => {
    if (!/^(0[0-9]{9})$/.test(soDienThoai)) {
      Alert.alert(
        "Lỗi",
        "Số điện thoại không hợp lệ (phải gồm 10 chữ số và bắt đầu bằng số 0)"
      );
      return;
    }

    dispatch(
      updateGiangVienPhone({
        MaGV: maGV,
        SoDienThoai: soDienThoai,
      })
    );
  };

  const isChanged = soDienThoai !== giangVienInfo?.SoDienThoai;

  if (loading && !giangVienInfo) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Đang tải dữ liệu giảng viên...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Hồ Sơ Giảng Viên</Text>
      <Text style={styles.label}>Mã giảng viên</Text>
      <TextInput
        value={giangVienInfo?.MaGV || ""}
        editable={false}
        style={styles.disabled}
      />

      <Text style={styles.label}>Họ và tên</Text>

      <TextInput
        value={giangVienInfo?.HoTen || ""}
        editable={false}
        style={styles.disabled}
      />

      <Text style={styles.label}>Khoa / Bộ môn</Text>
      <TextInput
        value={giangVienInfo?.MaKhoa || ""}
        editable={false}
        style={styles.disabled}
      />

      <Text style={styles.label}>Email công vụ</Text>
      <TextInput
        value={giangVienInfo?.Email || ""}
        editable={false}
        style={styles.disabled}
      />

      <Text style={[styles.label, { color: "#007AFF" }]}>
        Số điện thoại cá nhân (Có thể sửa)
      </Text>
      <TextInput
        placeholder="Nhập số điện thoại mới"
        value={soDienThoai}
        onChangeText={setSoDienThoai}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={{ marginTop: 10, marginBottom: 40 }}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button
            title="Lưu thay đổi"
            onPress={handleSave}
            disabled={!isChanged || loading}
            color="#007AFF"
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  disabled: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    color: "#777",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default ChinhSuaThongTinScreen;
