import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchThongBao, postThongBao } from "../../../redux/slices/thongbaoSlice";

export default function ThongBaoModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.thongBao?.list || []);

  const [tieuDe, setTieuDe] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [maNguoiNhan, setMaNguoiNhan] = useState("HSU_All"); // mặc định gửi cho tất cả

  const currentUserId = "HSU_Admin"; // người gửi cố định

  useEffect(() => {
    if (visible) {
      dispatch(fetchThongBao());
    }
  }, [visible]);

  const handlePost = () => {
    if (!tieuDe.trim() || !noiDung.trim() || !maNguoiNhan.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    dispatch(postThongBao({
      TieuDe: tieuDe,
      NoiDung: noiDung,
      MaNguoiGui: currentUserId,
      MaNguoiNhan: maNguoiNhan
    }));

    setTieuDe("");
    setNoiDung("");
    setMaNguoiNhan("HSU_All");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Thông báo</Text>

        <TextInput
          style={styles.input}
          placeholder="Tiêu đề"
          value={tieuDe}
          onChangeText={setTieuDe}
        />

        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Nội dung"
          value={noiDung}
          onChangeText={setNoiDung}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="Người nhận (Mã sinh viên hoặc ALL)"
          value={maNguoiNhan}
          onChangeText={setMaNguoiNhan}
        />

        <TouchableOpacity style={styles.btn} onPress={handlePost}>
          <Text style={styles.btnText}>Gửi thông báo</Text>
        </TouchableOpacity>

        <FlatList
          style={{ marginTop: 20 }}
          data={list}
          keyExtractor={(item) => item.MaTB?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.rowTitle}>{item.TieuDe}</Text>
              <Text>{item.NoiDung}</Text>
              <Text style={styles.rowSub}>Người gửi: {item.MaNguoiGui}</Text>
              <Text style={styles.rowSub}>Người nhận: {item.MaNguoiNhan}</Text>
            </View>
          )}
          ListEmptyComponent={() => <Text>Chưa có thông báo</Text>}
        />

        <Text style={styles.close} onPress={onClose}>Đóng</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginBottom: 12 },
  btn: { backgroundColor: "#0a57a1", padding: 12, borderRadius: 6, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "700" },
  row: { padding: 10, borderBottomWidth: 1, borderColor: "#eee" },
  rowTitle: { fontWeight: "700" },
  rowSub: { fontSize: 12, color: "#555" },
  close: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#0a57a1", fontWeight: "700" },
});
