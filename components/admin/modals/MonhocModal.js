import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMonHoc,
  addMonHoc,
  updateMonHoc,
  deleteMonHoc,
} from "../../../redux/slices/monhocSlice";

export default function MonHocModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.monHoc.list);

  const [MaMH, setMaMH] = useState("");
  const [TenMH, setTenMH] = useState("");
  const [SoTinChi, setSoTinChi] = useState("");
  const [MaGV, setMaGV] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (visible) dispatch(fetchMonHoc());
  }, [visible]);

  const reset = () => {
    setMaMH("");
    setTenMH("");
    setSoTinChi("");
    setMaGV("");
    setEdit(false);
  };

  const submit = () => {
    const data = {
      MaMH,
      TenMH,
      SoTinChi: Number(SoTinChi),
      MaGV,
    };

    edit ? dispatch(updateMonHoc(data)) : dispatch(addMonHoc(data));
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Quản lý Môn học</Text>

        <TextInput
          style={styles.input}
          placeholder="Mã môn học"
          value={MaMH}
          onChangeText={setMaMH}
          editable={!edit}
        />

        <TextInput
          style={styles.input}
          placeholder="Tên môn học"
          value={TenMH}
          onChangeText={setTenMH}
        />

        <TextInput
          style={styles.input}
          placeholder="Số tín chỉ"
          value={SoTinChi}
          keyboardType="numeric"
          onChangeText={setSoTinChi}
        />

        <TextInput
          style={styles.input}
          placeholder="Mã giảng viên"
          value={MaGV}
          onChangeText={setMaGV}
        />

        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.btnText}>
            {edit ? "Cập nhật" : "Thêm"}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={list}
          keyExtractor={(item) => item.MaMH}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.rowText}>
                  {item.MaMH} - {item.TenMH}
                </Text>
                <Text style={styles.subText}>
                  {item.SoTinChi} tín chỉ | GV: {item.MaGV}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setMaMH(item.MaMH);
                    setTenMH(item.TenMH);
                    setSoTinChi(String(item.SoTinChi));
                    setMaGV(item.MaGV);
                    setEdit(true);
                  }}
                >
                  <Text style={styles.edit}>Sửa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => dispatch(deleteMonHoc(item.MaMH))}
                >
                  <Text style={styles.delete}>Xoá</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  btn: {
    backgroundColor: "#0a57a1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "700" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  rowText: { fontWeight: "600" },
  subText: { fontSize: 12, color: "#555" },
  actions: { flexDirection: "row" },
  edit: { color: "#0a57a1", marginRight: 12 },
  delete: { color: "#e74c3c" },
  close: { textAlign: "center", marginTop: 16, color: "#555" },
});
