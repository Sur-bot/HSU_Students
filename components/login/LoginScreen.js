import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!username || !password) {
      return Alert.alert(
        "Lỗi",
        "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu"
      );
    }

    try {
      const resultAction = await dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        Alert.alert(
          "Thành công",
          `Xin chào ${resultAction.payload.user.username}`
        );
        setUsername("");
        setPassword("");
      } else {
        Alert.alert("Lỗi", resultAction.payload || "Đăng nhập thất bại");
      }
    } catch (err) {
      Alert.alert("Lỗi", err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.langRow}>
            <Text style={[styles.langText, styles.langActive]}>VI</Text>
            <Text style={styles.langDivider}>|</Text>
            <Text style={styles.langText}>EN</Text>
          </View>

          <View style={styles.logoWrap}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logoImage} resizeMode="contain" />
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Tài khoản</Text>
            <TextInput
              placeholder="Tài khoản"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="#999"
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Mật khẩu</Text>
            <View style={styles.passwordRow}>
              <TextInput
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={[styles.input, styles.passwordInput]}
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, loading && styles.primaryBtnDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={styles.primaryBtnText}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Quên mật khẩu?/Cần hỗ trợ?</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Phiên bản 4.4.4</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 6,
    paddingRight: 4,
  },
  langText: {
    color: "#7f8c8d",
    fontWeight: "600",
    marginHorizontal: 6,
  },
  langActive: { color: "#1672b8" },
  langDivider: { color: "#bdc3c7" },

  logoWrap: { alignItems: "center", marginTop: 6, marginBottom: 12 },
  logoTitle: {
    textAlign: "center",
    fontSize: 24,
    color: "#0a57a1",
    fontWeight: "800",
    letterSpacing: 1,
    lineHeight: 30,
  },
  logoBadge: {
    marginTop: 10,
    backgroundColor: "#e74c3c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  logoBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },
  logoImage: { width: 220, height: 120 },

  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 15,
    color: "#222",
  },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  passwordInput: { flex: 1 },
  eyeBtn: {
    marginLeft: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeText: { fontSize: 18 },

  primaryBtn: {
    marginTop: 22,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#0a57a1",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnDisabled: { opacity: 0.7 },
  primaryBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  errorText: { color: "#c0392b", marginTop: 8, textAlign: "center" },

  footer: {
    alignItems: "center",
    marginTop: 18,
  },
  footerLink: { color: "#2c3e50", fontSize: 14, marginBottom: 6 },
  versionText: { color: "#95a5a6", fontSize: 13, marginTop: 6 },
});
