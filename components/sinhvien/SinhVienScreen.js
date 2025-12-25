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
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SinhVienScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState("home");
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileCard}>
            <View style={styles.profileIcon}>
              <MaterialCommunityIcons name="account" size={28} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SuaThongTin")}
              >
                <Text style={styles.profileName}>
                  {user?.hoTen || "Sinh viên"}
                </Text>
              </TouchableOpacity>
              <View style={styles.profileTagsRow}>
                <View style={styles.tagRow}>
                  <MaterialCommunityIcons
                    name="history"
                    size={16}
                    color="#e8f0f7"
                  />
                  <Text style={styles.tagText}> Sự kiện đã tham gia</Text>
                </View>
                <View style={styles.tagDivider} />
                <View style={styles.tagRow}>
                  <MaterialCommunityIcons
                    name="card-account"
                    size={16}
                    color="#e8f0f7"
                  />
                  <Text style={styles.tagText}> Thẻ sinh viên</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Main content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentScroll}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tính năng yêu thích</Text>
              <MaterialCommunityIcons name="tune" size={20} color="#0a57a1" />
            </View>

            <View style={styles.grid}>
              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => navigation.navigate("ThoiKhoaBieu")}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Thời khoá biểu</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="account-check"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Điểm danh</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="clipboard-check"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Chuyên cần</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Lịch thi</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="cash"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Học phí</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => navigation.navigate("DiemSinhVien")}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="chart-bar"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Điểm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.gridItem}
                onPress={() => navigation.navigate("DanhSachMonHoc")}
              >
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="clipboard-list"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Danh sách môn học</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gridItem}>
                <View style={styles.gridIconBox}>
                  <MaterialCommunityIcons
                    name="plus"
                    size={26}
                    color="#0a57a1"
                  />
                </View>
                <Text style={styles.gridLabel}>Xem thêm</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
              <Text style={styles.seeMore}>{"›"}</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventsRow}
            >
              <View style={styles.eventCard}>
                <View style={styles.eventImagePlaceholder}>
                  <Text style={styles.eventEmoji}>🎓</Text>
                </View>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  "Building early – Lesson from Joining a Startup" – Khởi
                  động...
                </Text>
              </View>

              <View style={styles.eventCard}>
                <View style={styles.eventImagePlaceholder}>
                  <Text style={styles.eventEmoji}>📢</Text>
                </View>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  Đăng ký nhận quà Năm mới 2026
                </Text>
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventImagePlaceholder}>
                  <Text style={styles.eventEmoji}>📢</Text>
                </View>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  Đăng ký nhận quà Năm mới 2026
                </Text>
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventImagePlaceholder}>
                  <Text style={styles.eventEmoji}>📢</Text>
                </View>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  Đăng ký nhận quà Năm mới 2026
                </Text>
              </View>
              <View style={styles.eventCard}>
                <View style={styles.eventImagePlaceholder}>
                  <Text style={styles.eventEmoji}>📢</Text>
                </View>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  Đăng ký nhận quà Năm mới 2026
                </Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8f9fa" },
  container: { flex: 1 },

  header: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#0a57a1",
    borderRadius: 12,
    padding: 14,
    alignItems: "flex-start",
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
    marginBottom: 8,
  },
  profileTagsRow: { flexDirection: "row", alignItems: "center" },
  tagRow: { flexDirection: "row", alignItems: "center", marginRight: 8 },
  tagText: { color: "#e8f0f7", fontSize: 12 },
  tagDivider: {
    width: 1,
    height: 18,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginHorizontal: 8,
  },

  content: { flex: 1 },
  contentScroll: { paddingBottom: 110 },

  section: { marginVertical: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1a1a1a" },
  seeMore: { fontSize: 22, color: "#0a57a1" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  gridItem: { width: "23%", alignItems: "center", marginBottom: 16 },
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

  eventsRow: { paddingLeft: 16, paddingRight: 8 },
  eventCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 12,
    overflow: "hidden",
  },
  eventImagePlaceholder: {
    height: 120,
    backgroundColor: "#e8eef5",
    justifyContent: "center",
    alignItems: "center",
  },
  eventEmoji: { fontSize: 44 },
  eventTitle: {
    padding: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#2c3e50",
    lineHeight: 18,
  },

  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 28,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    paddingVertical: 8,
    height: 78,
  },
  navItem: { flex: 1, justifyContent: "center", alignItems: "center" },
  navItemCenter: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  qrCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#0a57a1",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  navLabel: { fontSize: 11, color: "#7f8c8d", marginTop: 2 },
  navLabelActive: { color: "#0a57a1", fontWeight: "700" },

  notifyWrap: { alignItems: "center", justifyContent: "center" },
  badge: {
    position: "absolute",
    top: -6,
    right: -12,
    backgroundColor: "#e74c3c",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "700" },
});
