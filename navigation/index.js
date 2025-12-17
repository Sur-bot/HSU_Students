import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../components/login/LoginScreen";
import AdminScreen from "../components/admin/AdminScreen";
import GiangVienScreen from "../components/giangvien/GiangVienScreen";
import SinhVienScreen from "../components/sinhvien/SinhVienScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token && <Stack.Screen name="Login" component={LoginScreen} />}
        {token && role === "Admin" && (
          <Stack.Screen name="Admin" component={AdminScreen} />
        )}
        {token && role === "GiangVien" && (
          <Stack.Screen name="GiangVien" component={GiangVienScreen} />
        )}
        {token && role === "SinhVien" && (
          <Stack.Screen name="SinhVien" component={SinhVienScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
