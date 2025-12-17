import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';

export default function GiangVienScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', style: 'destructive', onPress: () => dispatch(logout()) },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào mừng Giảng viên {user?.username}!</Text>
      <Text style={styles.info}>Đây là màn hình dành cho Giảng viên.</Text>
      <Button title="Đăng xuất" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20, backgroundColor:'#f0f4f7' },
  title: { fontSize:22, fontWeight:'bold', marginBottom:10, color:'#2c3e50' },
  info: { fontSize:16, marginBottom:20, color:'#34495e', textAlign:'center' },
});
