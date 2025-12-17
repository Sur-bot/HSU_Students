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

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : role === "Admin" ? (
          <Stack.Screen name="Admin" component={AdminScreen} />
        ) : role === "GiangVien" ? (
          <Stack.Screen name="GiangVien" component={GiangVienScreen} />
        ) : role === "SinhVien" ? (
          <>
            <Stack.Screen name="SinhVien" component={SinhVienScreen} />
            <Stack.Screen
              name="DiemSinhVien"
              component={DiemSinhVienScreen}
              options={{ headerShown: true, title: "Bảng điểm" }}
            />
            <Stack.Screen
              name="DanhSachMonHoc"
              component={DanhSachMonHocScreen}
              options={{ headerShown: true, title: "Danh sách môn học" }}
            />
          </>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
