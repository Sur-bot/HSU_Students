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
import { Picker } from "@react-native-picker/picker";
import {
  fetchTaiKhoan,
  addTaiKhoan,
  updateTaiKhoan,
  deleteTaiKhoan,
} from "../../../redux/slices/taikhoanSlice";
import baseStyles from "./baseStyles";

const API = "http://localhost:3000/api/taikhoan";

export default function TaiKhoanModal({ visible, onClose }) {
  const dispatch = useDispatch();
  const list = useSelector((s) => s.taikhoan.list);

  const [TenDangNhap, setTenDangNhap] = useState("");
  const [MatKhau, setMatKhau] = useState("");
  const [VaiTro, setVaiTro] = useState("SinhVien");
  const [MaSV, setMaSV] = useState("");
  const [MaGV, setMaGV] = useState("");
  const [edit, setEdit] = useState(false);

  // search
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (visible) dispatch(fetchTaiKhoan());
  }, [visible]);

  const reset = () => {
    setTenDangNhap("");
    setMatKhau("");
    setVaiTro("SinhVien");
    setMaSV("");
    setMaGV("");
    setEdit(false);
  };

  const submit = () => {
    const data = {
      TenDangNhap,
      MatKhau,
      VaiTro,
      MaSV: VaiTro === "SinhVien" ? MaSV : null,
      MaGV: VaiTro === "GiangVien" ? MaGV : null,
    };

    edit ? dispatch(updateTaiKhoan(data)) : dispatch(addTaiKhoan(data));
    reset();
  };

  // 🔍 SEARCH THEO TÊN ĐĂNG NHẬP
  const handleSearch = async () => {
    if (!search) {
      dispatch(fetchTaiKhoan());
      return;
    }
    const res = await fetch(`${API}/${search}`);
    const data = await res.json();
    dispatch({
      type: "taikhoan/fetch/fulfilled",
      payload: data ? [data] : [],
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Quản lý Tài khoản</Text>

        {/* ===== SEARCH ===== */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Tìm theo tên đăng nhập"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.btn} onPress={handleSearch}>
            <Text style={styles.btnText}>Tìm</Text>
          </TouchableOpacity>
        </View>

        {/* ===== FORM ===== */}
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          value={TenDangNhap}
          onChangeText={setTenDangNhap}
          editable={!edit}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={MatKhau}
          secureTextEntry
          onChangeText={setMatKhau}
        />

        {/* ===== ROLE SELECT ===== */}
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={VaiTro}
            onValueChange={(v) => setVaiTro(v)}
          >
            <Picker.Item label="Sinh viên" value="SinhVien" />
            <Picker.Item label="Giảng viên" value="GiangVien" />
            <Picker.Item label="Admin" value="Admin" />
          </Picker>
        </View>

        {/* ===== CONDITIONAL INPUT ===== */}
        {VaiTro === "SinhVien" && (
          <TextInput
            style={styles.input}
            placeholder="Mã sinh viên"
            value={MaSV}
            onChangeText={setMaSV}
          />
        )}

        {VaiTro === "GiangVien" && (
          <TextInput
            style={styles.input}
            placeholder="Mã giảng viên"
            value={MaGV}
            onChangeText={setMaGV}
          />
        )}

        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.btnText}>
            {edit ? "Cập nhật" : "Thêm"}
          </Text>
        </TouchableOpacity>

        {/* ===== LIST ===== */}
        <FlatList
          data={list}
          keyExtractor={(item) => item.TenDangNhap}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.rowText}>
                  {item.TenDangNhap} ({item.VaiTro})
                </Text>
                <Text style={styles.subText}>
                  SV: {item.MaSV || "-"} | GV: {item.MaGV || "-"}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setTenDangNhap(item.TenDangNhap);
                    setMatKhau(item.MatKhau);
                    setVaiTro(item.VaiTro);
                    setMaSV(item.MaSV || "");
                    setMaGV(item.MaGV || "");
                    setEdit(true);
                  }}
                >
                  <Text style={styles.edit}>Sửa</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    dispatch(deleteTaiKhoan(item.TenDangNhap))
                  }
                >
                  <Text style={styles.delete}>Xoá</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <Text style={styles.close} onPress={onClose}>
          Đóng
        </Text>
      </View>
    </Modal>
  );
}

const styles = {
  ...baseStyles,
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
};
