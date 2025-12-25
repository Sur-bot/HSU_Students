import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLop,
  addLop,
  updateLop,
  deleteLop,
} from "../../../redux/slices/lopSlice";
import baseStyles from "./baseStyles";

export default function LopModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.lop.list);

  const [MaLop, setMaLop] = useState("");
  const [TenLop, setTenLop] = useState("");
  const [MaKhoa, setMaKhoa] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (visible) dispatch(fetchLop());
  }, [visible]);

  const reset = () => {
    setMaLop("");
    setTenLop("");
    setMaKhoa("");
    setEdit(false);
  };

  const submit = () => {
    const data = { MaLop, TenLop, MaKhoa };
    edit ? dispatch(updateLop(data)) : dispatch(addLop(data));
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Quản lý Lớp</Text>

        <TextInput
          style={styles.input}
          placeholder="Mã lớp"
          value={MaLop}
          onChangeText={setMaLop}
          editable={!edit}
        />

        <TextInput
          style={styles.input}
          placeholder="Tên lớp"
          value={TenLop}
          onChangeText={setTenLop}
        />

        <TextInput
          style={styles.input}
          placeholder="Mã khoa"
          value={MaKhoa}
          onChangeText={setMaKhoa}
        />

        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.btnText}>
            {edit ? "Cập nhật" : "Thêm"}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={list}
          keyExtractor={(item) => item.MaLop}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.rowText}>
                  {item.MaLop} - {item.TenLop}
                </Text>
                <Text style={styles.subText}>
                  Khoa: {item.MaKhoa}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setMaLop(item.MaLop);
                    setTenLop(item.TenLop);
                    setMaKhoa(item.MaKhoa);
                    setEdit(true);
                  }}
                >
                  <Text style={styles.edit}>Sửa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => dispatch(deleteLop(item.MaLop))}
                >
                  <Text style={styles.delete}>Xoá</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <Text style={styles.close} onPress={onClose}>Đóng</Text>
      </View>
    </Modal>
  );
}

const styles = baseStyles;
