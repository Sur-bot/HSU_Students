import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../components/login/LoginScreen";
import AdminScreen from "../components/admin/AdminScreen";
import GiangVienScreen from "../components/giangvien/GiangVienScreen";
import SinhVienScreen from "../components/sinhvien/SinhVienScreen";

import DiemSinhVienScreen from "../components/sinhvien/routes/DiemSinhVienScreen";
import DanhSachMonHocScreen from "../components/sinhvien/routes/DanhSachMonHocScreen";
import ThoiKhoaBieuScreen from "../components/sinhvien/routes/ThoiKhoaBieuScreen";
import EditStudentProfile from "../components/sinhvien/routes/EditStudentProfile";
import DanhSachLopGiangVienScreen from "../components/giangvien/routes/DanhSachLopGiangVienScreen";
import DanhSachSinhVienScreen from "../components/giangvien/routes/DanhSachSinhVienScreen";
import LichDayGiangVienScreen from "../components/giangvien/routes/LichDayGiangVienScreen";
import MonHocGiangVienScreen from "../components/giangvien/routes/MonHocGiangVienScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <NavigationContainer key={token ? "user" : "guest"}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : role === "Admin" ? (
          <Stack.Screen name="Admin" component={AdminScreen} />
        ) : role === "GiangVien" ? (
          <>
            <Stack.Screen name="GiangVien" component={GiangVienScreen} />
            <Stack.Screen
              name="DanhSachLop"
              component={DanhSachLopGiangVienScreen}
              options={{ headerShown: true, title: "Danh sách lớp" }}
            />
            <Stack.Screen
              name="DanhSachSinhVien"
              component={DanhSachSinhVienScreen}
              options={{ headerShown: true, title: "Danh sách sinh viên" }}
            />
            <Stack.Screen
              name="LichDayGiangVien"
              component={LichDayGiangVienScreen}
              options={{ headerShown: true, title: "Lịch dạy giảng viên" }}
            />
            <Stack.Screen
              name="MonHocGiangVien"
              component={MonHocGiangVienScreen}
              options={{ headerShown: true, title: "Môn học giảng viên" }}
            />
          </>
        ) : role === "SinhVien" ? (
          <>
            <Stack.Screen name="SinhVien" component={SinhVienScreen} />
            <Stack.Screen
              name="DiemSinhVien"
              component={DiemSinhVienScreen}
              options={{ headerShown: true, title: "Điểm sinh viên" }}
            />
            <Stack.Screen
              name="DanhSachMonHoc"
              component={DanhSachMonHocScreen}
              options={{ headerShown: true, title: "Danh sách môn học" }}
            />
            <Stack.Screen
              name="ThoiKhoaBieu"
              component={ThoiKhoaBieuScreen}
              options={{ headerShown: true, title: "Thời khóa biểu" }}
            />
            <Stack.Screen
              name="SuaThongTin"
              component={EditStudentProfile}
              options={{ headerShown: true }}
            />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
