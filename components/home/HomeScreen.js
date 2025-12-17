import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Đang đăng xuất...</Text>
      </View>
    );
  }

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Xin chào, {user?.username}</Text>
      <Text style={styles.text}>Vai trò: {user?.role}</Text>
      {user.maSV && <Text style={styles.text}>Mã SV: {user.maSV}</Text>}
      {user.maGV && <Text style={styles.text}>Mã GV: {user.maGV}</Text>}
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 10 },
});
