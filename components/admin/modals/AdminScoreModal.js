import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminClassScores,
  fetchAdminGPA,
  clearAdminScores,
} from "../../../redux/slices/adminScoreSlice";

import {
  fetchLopByMonHoc,
  clearLopByMonHoc,
} from "../../../redux/slices/lopSlice";

import baseStyles from "./baseStyles";

export default function AdminScoreModal({
  visible,
  monHocList = [],
  onClose,
}) {
  const dispatch = useDispatch();

  const { classScores = [], gpaResult, loading, error } =
    useSelector((state) => state.adminScore);

  const lopList = useSelector((state) => state.lop.byMonHoc);

  const [tab, setTab] = useState("class");
  const [MaMH, setMaMH] = useState("");
  const [MaLop, setMaLop] = useState("");
  const [MaSV, setMaSV] = useState("");

  useEffect(() => {
    if (!visible) {
      dispatch(clearAdminScores());
      dispatch(clearLopByMonHoc());
      setMaMH("");
      setMaLop("");
      setMaSV("");
      setTab("class");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Quản lý điểm</Text>

        {/* ===== TAB ===== */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity
            style={[styles.btn, tab === "class" && styles.btnActive]}
            onPress={() => setTab("class")}
          >
            <Text style={styles.btnText}>Bảng điểm lớp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, tab === "gpa" && styles.btnActive]}
            onPress={() => setTab("gpa")}
          >
            <Text style={styles.btnText}>Tìm GPA Sinhvien</Text>
          </TouchableOpacity>
        </View>

        {/* ===== TAB: BẢNG ĐIỂM LỚP ===== */}
        {tab === "class" && (
          <>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={MaMH}
                onValueChange={(value) => {
                  setMaMH(value);
                  setMaLop("");
                  if (value) {
                    dispatch(fetchLopByMonHoc(value));
                  } else {
                    dispatch(clearLopByMonHoc());
                  }
                }}
              >
                <Picker.Item label="-- Chọn môn học --" value="" />
                {monHocList.map((mh) => (
                  <Picker.Item
                    key={mh.MaMH}
                    label={`${mh.MaMH} - ${mh.TenMH}`}
                    value={mh.MaMH}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerBox}>
              <Picker
                selectedValue={MaLop}
                onValueChange={setMaLop}
                enabled={!!MaMH}
              >
                <Picker.Item label="-- Chọn lớp --" value="" />
                {lopList.map((lop) => (
                  <Picker.Item
                    key={lop.MaLop}
                    label={lop.TenLop}
                    value={lop.MaLop}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.btn}
              disabled={!MaMH || !MaLop}
              onPress={() =>
                dispatch(fetchAdminClassScores({ MaMH, MaLop }))
              }
            >
              <Text style={styles.btnText}>Xem</Text>
            </TouchableOpacity>

            {loading && <Text>Đang tải...</Text>}

            {!loading && classScores.length === 0 && (
              <Text>Không có dữ liệu</Text>
            )}

            <FlatList
              data={classScores}
              keyExtractor={(item) => item.MaSV}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.rowText}>
                    {item.MaSV} - {item.HoTen}
                  </Text>
                  <Text style={styles.subText}>
                    GK: {item.DiemGK ?? "-"} | CK: {item.DiemCK ?? "-"} | TB:{" "}
                    {item.DiemTB ?? "-"}
                  </Text>
                </View>
              )}
            />
          </>
        )}

        {/* ===== TAB: GPA ===== */}
        {tab === "gpa" && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nhập mã sinh viên"
              value={MaSV}
              onChangeText={setMaSV}
            />

            <TouchableOpacity
              style={styles.btn}
              onPress={() => MaSV && dispatch(fetchAdminGPA(MaSV.trim()))}
            >
              <Text style={styles.btnText}>Xem GPA</Text>
            </TouchableOpacity>

            {gpaResult && (
              <View style={styles.row}>
                <Text style={styles.rowText}>GPA: {gpaResult.GPA}</Text>
                <Text style={styles.subText}>
                  Tổng TC: {gpaResult.TongTinChi}
                </Text>
              </View>
            )}
          </>
        )}

        {error && <Text style={{ color: "red" }}>{error}</Text>}

        <Text style={styles.close} onPress={onClose}>
          Đóng
        </Text>
      </View>
    </Modal>
  );
}

const styles = {
  ...baseStyles,
  btnActive: { backgroundColor: "#0a57a1" },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
};
