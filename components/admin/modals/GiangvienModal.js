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
  fetchGiangVien,
  addGiangVien,
  updateGiangVien,
  deleteGiangVien,
} from "../../../redux/slices/giangvienSlice";
import baseStyles from "./baseStyles";

export default function GiangVienModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.giangVien.list);

  const [MaGV, setMaGV] = useState("");
  const [HoTen, setHoTen] = useState("");
  const [MaKhoa, setMaKhoa] = useState("");
  const [Email, setEmail] = useState("");
  const [SoDienThoai, setSoDienThoai] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (visible) dispatch(fetchGiangVien());
  }, [visible]);

  const reset = () => {
    setMaGV("");
    setHoTen("");
    setMaKhoa("");
    setEmail("");
    setSoDienThoai("");
    setEdit(false);
  };

  const submit = () => {
    const data = { MaGV, HoTen, MaKhoa, Email, SoDienThoai };
    edit ? dispatch(updateGiangVien(data)) : dispatch(addGiangVien(data));
    reset();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Quản lý Giảng viên</Text>

        <TextInput
          style={styles.input}
          placeholder="Mã giảng viên"
          value={MaGV}
          onChangeText={setMaGV}
          editable={!edit}
        />

        <TextInput
          style={styles.input}
          placeholder="Họ tên"
          value={HoTen}
          onChangeText={setHoTen}
        />

        <TextInput
          style={styles.input}
          placeholder="Mã khoa"
          value={MaKhoa}
          onChangeText={setMaKhoa}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={Email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={SoDienThoai}
          keyboardType="phone-pad"
          onChangeText={setSoDienThoai}
        />

        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.btnText}>
            {edit ? "Cập nhật" : "Thêm"}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={list}
          keyExtractor={(item) => item.MaGV}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.rowText}>
                  {item.MaGV} - {item.HoTen}
                </Text>
                <Text style={styles.subText}>
                  {item.Email} | {item.SoDienThoai}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setMaGV(item.MaGV);
                    setHoTen(item.HoTen);
                    setMaKhoa(item.MaKhoa);
                    setEmail(item.Email);
                    setSoDienThoai(item.SoDienThoai);
                    setEdit(true);
                  }}
                >
                  <Text style={styles.edit}>Sửa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => dispatch(deleteGiangVien(item.MaGV))}
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
