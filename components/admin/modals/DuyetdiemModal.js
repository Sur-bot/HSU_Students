import React, { useEffect } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchYeuCauDiemChoDuyet,
  duyetYeuCauDiem,
  tuChoiYeuCauDiem,
} from "../../../redux/slices/yeuCauDiemSlice";

export default function DuyetDiemModal({ visible, onClose, MaGV }) {
  const dispatch = useDispatch();

  // list các yêu cầu đang chờ duyệt
  const list = useSelector((s) => s.yeuCauDiem?.listChoDuyet || []);

  useEffect(() => {
    if (visible) {
      dispatch(fetchYeuCauDiemChoDuyet());
    }
  }, [visible]);

  const handleDuyet = (item) => {
    dispatch(
      duyetYeuCauDiem({
        MaSV: item.MaSV,
        MaMH: item.MaMH,
        MaGV: item.MaGV,
        DiemGK: item.DiemGK,
        DiemCK: item.DiemCK,
      })
    );
  };

  const handleTuChoi = (item) => {
    dispatch(
      tuChoiYeuCauDiem({
        MaSV: item.MaSV,
        MaMH: item.MaMH,
        MaGV: item.MaGV,
      })
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Duyệt điểm sinh viên</Text>

        <FlatList
          data={list}
          keyExtractor={(i) => i.MaSV + i.MaMH + i.MaGV}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.rowText}>
                  {item.MaSV} - {item.MaMH} ({item.MaGV})
                </Text>
                <Text style={styles.subText}>
                  GK: {item.DiemGK} | CK: {item.DiemCK}
                </Text>
                <Text style={styles.subText}>Trạng thái: {item.Status}</Text>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.btn, styles.duyetBtn]}
                  onPress={() => handleDuyet(item)}
                >
                  <Text style={styles.btnText}>Duyệt</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.huyBtn]}
                  onPress={() => handleTuChoi(item)}
                >
                  <Text style={styles.btnText}>Từ chối</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Không có yêu cầu chờ duyệt</Text>
          )}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  rowText: { fontSize: 16, fontWeight: "500" },
  subText: { fontSize: 14, color: "#555" },
  buttons: { flexDirection: "row" },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
  },
  duyetBtn: { backgroundColor: "#27ae60" },
  huyBtn: { backgroundColor: "#e74c3c" },
  btnText: { color: "#fff", fontWeight: "600" },
  close: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#0a57a1",
    fontWeight: "700",
  },
  emptyText: { textAlign: "center", marginTop: 20, color: "#555" },
});
