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
import baseStyles from "./baseStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchKhoa,
  addKhoa,
  updateKhoa,
  deleteKhoa,
} from "../../../redux/slices/khoaSlice";

export default function KhoaModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.khoa.list);

  const [MaKhoa, setMaKhoa] = useState("");
  const [TenKhoa, setTenKhoa] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (visible) dispatch(fetchKhoa());
  }, [visible]);

  const reset = () => {
    setMaKhoa("");
    setTenKhoa("");
    setEdit(false);
  };

  const submit = () => {
    const data = { MaKhoa, TenKhoa };
    edit ? dispatch(updateKhoa(data)) : dispatch(addKhoa(data));
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Quản lý Khoa</Text>

        <TextInput
          style={styles.input}
          placeholder="Mã khoa"
          value={MaKhoa}
          onChangeText={setMaKhoa}
          editable={!edit}
        />

        <TextInput
          style={styles.input}
          placeholder="Tên khoa"
          value={TenKhoa}
          onChangeText={setTenKhoa}
        />

        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.btnText}>{edit ? "Cập nhật" : "Thêm"}</Text>
        </TouchableOpacity>

        <FlatList
          data={list}
          keyExtractor={(item) => item.MaKhoa}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.rowText}>
                {item.MaKhoa} - {item.TenKhoa}
              </Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setMaKhoa(item.MaKhoa);
                    setTenKhoa(item.TenKhoa);
                    setEdit(true);
                  }}
                >
                  <Text style={styles.edit}>Sửa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => dispatch(deleteKhoa(item.MaKhoa))}
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

const styles = baseStyles;
