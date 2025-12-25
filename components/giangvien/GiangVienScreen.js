import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import NhapDiemModal from "./routes/NhapdiemModal";
export default function GiangVienScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [showNhapDiem, setShowNhapDiem] = useState(false);

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => dispatch(logout()),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ===== Header ===== */}
        <View style={styles.header}>
          <View style={styles.profileCard}>
            <View style={styles.profileIcon}>
              <MaterialCommunityIcons
                name="account-tie"
                size={28}
                color="#fff"
              />
            </View>

            <View style={styles.profileInfo}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ChinhSuaThongTin")}
              >
                <Text style={styles.profileName}>
                  {user?.hoTen || user?.username || "Giảng viên"}
                </Text>
              </TouchableOpacity>
              <View style={styles.profileTagsRow}>
                <View style={styles.tagRow}>
                  <MaterialCommunityIcons
                    name="teach"
                    size={16}
                    color="#e8f0f7"
                  />
                  <Text style={styles.tagText}> Giảng dạy</Text>
                </View>
                <View style={styles.tagDivider} />
                <View style={styles.tagRow}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={16}
                    color="#e8f0f7"
                  />
                  <Text style={styles.tagText}> Hội đồng</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ===== Content ===== */}
        <ScrollView contentContainerStyle={styles.content}>
          {/* ===== Features ===== */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chức năng giảng viên</Text>

            <View style={styles.grid}>
              <Feature
                icon="calendar"
                label="Buổi dạy"
                onPress={() => navigation.navigate("LichDayGiangVien")}
              />
              <Feature
                icon="account-group"
                label="DS Sinh viên"
                onPress={() => navigation.navigate("DanhSachSinhVien")}
              />
              <Feature
                icon="account-check"
                label="Điểm danh"
                onPress={() => navigation.navigate("DiemDanhSinhVien")}
              />
              <Feature
                icon="clipboard-edit"
                label="Nhập điểm"
                onPress={() => setShowNhapDiem(true)}
              />
              <Feature
                icon="clipboard-list"
                label="Danh sách lớp"
                onPress={() => navigation.navigate("DanhSachLop")}
              />

              <Feature
                icon="clipboard-list"
                label="DS Môn học"
                onPress={() => navigation.navigate("MonHocGiangVien")}
              />
            </View>
          </View>

          {/* ===== Logout ===== */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={20} color="#fff" />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <NhapDiemModal
        visible={showNhapDiem}
        onClose={() => setShowNhapDiem(false)}
        MaGV={user.username.toUpperCase()}
      />
    </SafeAreaView>


  );

}

/* ===== Feature item ===== */
function Feature({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.gridItem} onPress={onPress}>
      <View style={styles.gridIconBox}>
        <MaterialCommunityIcons name={icon} size={26} color="#0a57a1" />
      </View>
      <Text style={styles.gridLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ===== Styles ===== */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { flex: 1 },

  header: { padding: 16 },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#0a57a1",
    borderRadius: 12,
    padding: 14,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileInfo: { flex: 1 },
  profileName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  profileTagsRow: { flexDirection: "row", alignItems: "center" },
  tagRow: { flexDirection: "row", alignItems: "center" },
  tagText: { color: "#e8f0f7", fontSize: 12 },
  tagDivider: {
    width: 1,
    height: 18,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginHorizontal: 10,
  },

  content: { paddingBottom: 40 },

  section: { marginTop: 10 },
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
  gridItem: { width: "30%", alignItems: "center", marginBottom: 18 },
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
    fontWeight: "600",
    color: "#2c3e50",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#e74c3c",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
  },
});
