import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { logout } from "../../redux/authSlice";

// ===== FETCH DATA =====
import { fetchMonHoc } from "../../redux/slices/monhocSlice";
import { fetchLop } from "../../redux/slices/lopSlice";

// ===== MODALS =====
import KhoaModal from "./modals/KhoaModal";
import LopModal from "./modals/LopModal";
import GiangVienModal from "./modals/GiangvienModal";
import MonHocModal from "./modals/MonhocModal";
import TaiKhoanModal from "./modals/TaikhoanModal";
import AdminScoreModal from "./modals/AdminScoreModal";

export default function AdminScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // ===== LOAD DATA (QUAN TRỌNG) =====
  useEffect(() => {
    dispatch(fetchMonHoc());
   
  }, [dispatch]);

  // ===== STATE MODAL =====
  const [showKhoa, setShowKhoa] = useState(false);
  const [showLop, setShowLop] = useState(false);
  const [showGV, setShowGV] = useState(false);
  const [showMH, setShowMH] = useState(false);
  const [showTK, setShowTK] = useState(false);
  const [showScore, setShowScore] = useState(false);

  // ===== DATA FROM STORE =====
  const monHocList = useSelector((state) => state.monHoc.list);
  const lopList = useSelector((state) => state.lop.list);

  // ===== LOGOUT =====
  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <View style={styles.profileCard}>
            <View style={styles.profileIcon}>
              <MaterialCommunityIcons
                name="shield-account"
                size={28}
                color="#fff"
              />
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.username || "Admin"}
              </Text>

              <View style={styles.profileTagsRow}>
                <MaterialCommunityIcons
                  name="cog"
                  size={16}
                  color="#e8f0f7"
                />
                <Text style={styles.tagText}> Quản trị hệ thống</Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleLogout}>
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== CONTENT ===== */}
        <ScrollView contentContainerStyle={styles.contentScroll}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quản lý danh mục</Text>

            {/* ===== GRID ICON ===== */}
            <View style={styles.grid}>
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => setShowKhoa(true)}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="school"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Khoa</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => setShowLop(true)}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="google-classroom"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Lớp</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => setShowGV(true)}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="account-tie"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Giảng viên</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => setShowMH(true)}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="book-open-variant"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Môn học</Text>
              </TouchableOpacity>

              {/* ===== QUẢN LÝ ĐIỂM ===== */}
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => setShowScore(true)}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="chart-bar"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Quản lý điểm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => setShowTK(true)}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="account-multiple"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Tài khoản</Text>
              </TouchableOpacity>
      
            </View>

            
          </View>
        </ScrollView>

        {/* ===== MODALS ===== */}
        <KhoaModal visible={showKhoa} onClose={() => setShowKhoa(false)} />
        <LopModal visible={showLop} onClose={() => setShowLop(false)} />
        <GiangVienModal visible={showGV} onClose={() => setShowGV(false)} />
        <MonHocModal visible={showMH} onClose={() => setShowMH(false)} />
        <TaiKhoanModal visible={showTK} onClose={() => setShowTK(false)} />

        {/* ===== MODAL QUẢN LÝ ĐIỂM ===== */}
        <AdminScoreModal
          visible={showScore}
          monHocList={monHocList}
          lopList={lopList}
          onClose={() => setShowScore(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { flex: 1 },

  header: { paddingHorizontal: 16, paddingTop: 12 },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#0a57a1",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileInfo: { flex: 1 },
  profileName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  profileTagsRow: { flexDirection: "row", alignItems: "center" },
  tagText: { color: "#e8f0f7", fontSize: 12 },

  contentScroll: { paddingBottom: 40 },

  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  gridItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 16,
  },
  gridIconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#f0f4f7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  gridLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#2c3e50",
    fontWeight: "600",
  },

  singleRow: {
    paddingHorizontal: 16,
    marginTop: 10,
    alignItems: "flex-start",
  },
});
