// ThongBaoModal.js
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchThongBao, postThongBao } from "../../../redux/slices/thongbaoSlice";

const API = "http://192.168.100.156:3000/api/thongbao";

export default function ThongBaoModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.thongBao?.list || []);

  const [tieuDe, setTieuDe] = useState("");
  const [noiDung, setNoiDung] = useState("");
  const [maNguoiNhan, setMaNguoiNhan] = useState("");
  const [maNguoiGui, setMaNguoiGui] = useState(""); // default gửi

  useEffect(() => {
    if (visible) dispatch(fetchThongBao());
  }, [visible]);

  const handlePost = () => {
    if (!tieuDe.trim() || !noiDung.trim() || !maNguoiNhan.trim() || !maNguoiGui.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    dispatch(
      postThongBao({
        TieuDe: tieuDe,
        NoiDung: noiDung,
        MaNguoiGui: maNguoiGui,
        MaNguoiNhan: maNguoiNhan,
      })
    );

    setTieuDe("");
    setNoiDung("");
    setMaNguoiNhan("");
    setMaNguoiGui("GV001");
  };

  const handleDelete = (MaTB) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa thông báo này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`${API}/${MaTB}`, { method: "DELETE" });
            dispatch(fetchThongBao());
          } catch (err) {
            Alert.alert("Lỗi", "Không thể xóa thông báo");
          }
        },
      },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Thông báo</Text>

        <TextInput
          style={styles.input}
          placeholder="Người gửi (Mã GV)"
          value={maNguoiGui}
          onChangeText={setMaNguoiGui}
        />

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
          placeholder="Người nhận (Mã sinh viên)"
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
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{item.TieuDe}</Text>
                <Text>{item.NoiDung}</Text>
                <Text style={styles.rowSub}>Người gửi: {item.MaNguoiGui}</Text>
                <Text style={styles.rowSub}>Người nhận: {item.MaNguoiNhan}</Text>
              </View>

              <TouchableOpacity onPress={() => handleDelete(item.MaTB)}>
                <Text style={styles.delete}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() => <Text>Chưa có thông báo</Text>}
        />

        <Text style={styles.close} onPress={onClose}>
          Đóng
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#0a57a1",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: { fontWeight: "700" },
  rowSub: { fontSize: 12, color: "#555" },
  delete: { color: "red", fontWeight: "700" },
  close: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#0a57a1",
    fontWeight: "700",
  },
});
