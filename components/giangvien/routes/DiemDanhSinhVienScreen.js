import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentsByTKB, submitAttendance, resetAttendanceStatus } from "../../../redux/lectorRedux/attendanceSlice";

const DiemDanhSinhVienScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  
  // Lấy dữ liệu truyền từ màn hình trước (Lịch dạy)
  const { maTKB, tenMH } = route.params || { maTKB: null, tenMH: "Điểm danh" };

  // Lấy dữ liệu từ Redux Store
  const { students, loading, success, error, message } = useSelector(
    (state) => state.attendance
  );

  // State local để quản lý việc tích chọn của giảng viên
  // Cấu trúc: { "SV001": "CoMat", "SV002": "Vang" }
  const [attendanceData, setAttendanceData] = useState({});

  // 1. Khi vừa vào màn hình: Gọi API lấy danh sách sinh viên
  useEffect(() => {
    if (maTKB) {
      dispatch(fetchStudentsByTKB(maTKB));
    }
  }, [maTKB, dispatch]);

  // 2. Khi danh sách sinh viên tải xong: Mặc định tất cả là "CoMat" (Có mặt)
  useEffect(() => {
    if (students && students.length > 0) {
      const initialStatus = {};
      students.forEach((sv) => {
        initialStatus[sv.MaSV] = "CoMat";
      });
      setAttendanceData(initialStatus);
    }
  }, [students]);

  // 3. Theo dõi trạng thái Success/Error từ Redux
  useEffect(() => {
    if (success) {
      Alert.alert("Thành công", message || "Ghi nhận điểm danh thành công!");
      dispatch(resetAttendanceStatus());
      navigation.goBack(); // Quay lại màn hình trước
    }
    if (error) {
      Alert.alert("Lỗi", error);
      dispatch(resetAttendanceStatus());
    }
  }, [success, error, message, dispatch, navigation]);

  // Hàm thay đổi trạng thái khi bấm nút (Có mặt / Vắng)
  const toggleAttendance = (maSV, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [maSV]: status,
    }));
  };

  // Hàm xử lý khi nhấn nút Lưu
  const handleSave = () => {
    const payload = {
      maTKB: maTKB,
      ngayHoc: new Date().toISOString().split("T")[0],
      attendanceList: Object.keys(attendanceData).map((maSV) => ({
        maSV: maSV,
        trangThai: attendanceData[maSV],
        ghiChu: "",
      })),
    };
    dispatch(submitAttendance(payload));
  };

  // Giao diện cho từng sinh viên trong danh sách
  const renderStudentItem = ({ item }) => {
    const currentStatus = attendanceData[item.MaSV];

    return (
      <View style={styles.card}>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.HoTen}</Text>
          <Text style={styles.studentId}>MSSV: {item.MaSV}</Text>
        </View>

        <View style={styles.actionGroup}>
          {/* Nút Có Mặt (P - Present) */}
          <TouchableOpacity
            style={[
              styles.statusBtn,
              currentStatus === "CoMat" && styles.btnPresentActive,
            ]}
            onPress={() => toggleAttendance(item.MaSV, "CoMat")}
          >
            <Text style={[styles.btnText, currentStatus === "CoMat" && styles.textWhite]}>Có</Text>
          </TouchableOpacity>

          {/* Nút Vắng (A - Absent) */}
          <TouchableOpacity
            style={[
              styles.statusBtn,
              currentStatus === "Vang" && styles.btnAbsentActive,
            ]}
            onPress={() => toggleAttendance(item.MaSV, "Vang")}
          >
            <Text style={[styles.btnText, currentStatus === "Vang" && styles.textWhite]}>Vắng</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.subjectName}>{tenMH}</Text>
        <Text style={styles.dateText}>Ngày: {new Date().toLocaleDateString('vi-VN')}</Text>
      </View>

      {/* Danh sách sinh viên */}
      {loading && students.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.MaSV}
          renderItem={renderStudentItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>Không có sinh viên nào trong lớp này.</Text>}
        />
      )}

      {/* Nút Xác Nhận ở dưới cùng */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveBtn, loading && { opacity: 0.7 }]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Lưu dữ liệu điểm danh</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F2F7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    alignItems: "center",
  },
  subjectName: { fontSize: 18, fontWeight: "bold", color: "#1C1C1E" },
  dateText: { fontSize: 14, color: "#8E8E93", marginTop: 4 },
  listContent: { padding: 15, paddingBottom: 100 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: "600", color: "#1C1C1E" },
  studentId: { fontSize: 13, color: "#8E8E93", marginTop: 2 },
  actionGroup: { flexDirection: "row", gap: 10 },
  statusBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D1D6",
  },
  btnPresentActive: { backgroundColor: "#34C759", borderColor: "#34C759" }, // Màu xanh lá
  btnAbsentActive: { backgroundColor: "#FF3B30", borderColor: "#FF3B30" },  // Màu đỏ
  btnText: { fontWeight: "bold", color: "#8E8E93" },
  textWhite: { color: "#fff" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#8E8E93' }
});

export default DiemDanhSinhVienScreen;