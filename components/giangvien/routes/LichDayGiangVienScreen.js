import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native"; // Thêm TouchableOpacity
import { Calendar } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { fetchLichDayGiangVien } from "../../../redux/lectorRedux/lichDayGiangVienSlice";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

export default function LichDayGiangVienScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Khởi tạo navigation
  const { lichDay } = useSelector((state) => state.lichDayGiangVien);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    dispatch(fetchLichDayGiangVien());
  }, []);

  const TIET_THOI_GIAN = {
    1: "07:00 - 07:45",
    2: "07:50 - 08:35",
    3: "08:40 - 09:30",
    4: "09:50 - 10:15",
    5: "10:20 - 11:05",
    6: "11:30 - 11:55",
    7: "13:00 - 14:15",
    8: "14:20 - 15:05",
    9: "15:10 - 15:55",
    10: "16:00 - 16:45",
    11: "16:50 - 17:35",
    12: "17:40 - 18:25",
  };

  const lichTheoNgay = useMemo(() => {
    const map = {};
    const numberOfWeeks = 4;

    lichDay.forEach((item) => {
      const thu = item.Thu === 8 ? 0 : item.Thu - 1; // CN = 0

      for (let i = 0; i < numberOfWeeks; i++) {
        let date = dayjs().day(thu).add(i, "week");
        if (date.isBefore(dayjs(), "day")) {
          date = date.add(1, "week");
        }
        const dateStr = date.format("YYYY-MM-DD");
        if (!map[dateStr]) map[dateStr] = [];
        map[dateStr].push(item);
      }
    });
    return map;
  }, [lichDay]);

  const markedDates = useMemo(() => {
    const marks = {};
    Object.keys(lichTheoNgay).forEach((date) => {
      marks[date] = { marked: true, dotColor: "#1976d2" };
    });
    marks[selectedDate] = {
      ...(marks[selectedDate] || {}),
      selected: true,
      selectedColor: "#1976d2",
    };
    return marks;
  }, [lichTheoNgay, selectedDate]);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: "#1976d2",
          todayTextColor: "#1976d2",
        }}
      />
      <Text style={styles.dateTitle}>
        {dayjs(selectedDate).format("dddd, DD MMM YYYY")}
      </Text>

      <FlatList
        data={lichTheoNgay[selectedDate] || []}
        keyExtractor={(item, index) =>
          `${item.MaTKB}-${selectedDate}-${item.TietBatDau}-${index}`
        }
        renderItem={({ item }) => {
          const startTiet = item.TietBatDau;
          const endTiet = item.TietBatDau + item.SoTiet - 1;
          const startTime = TIET_THOI_GIAN[startTiet].split(" - ")[0];
          const endTime = TIET_THOI_GIAN[endTiet].split(" - ")[1];

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                navigation.navigate("DiemDanhSinhVien", {
                  maTKB: item.MaTKB,
                  tenMH: item.TenMH,
                });
              }}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.time}>
                  {startTime} - {endTime}
                </Text>
                <View style={styles.attendanceTag}>
                  <Text style={styles.attendanceText}>Điểm danh</Text>
                </View>
              </View>

              <Text style={styles.subject}>{item.TenMH}</Text>
              <Text style={styles.details}>
                {item.TenLop} • Phòng {item.PhongHoc}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text style={styles.empty}>Không có lịch dạy</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  dateTitle: { fontSize: 16, fontWeight: "700", margin: 12 },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 15,
    borderRadius: 12,
    // Thêm đổ bóng cho Card nhìn chuyên nghiệp hơn
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: { color: "#1976d2", fontWeight: "700" },
  attendanceTag: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  attendanceText: { color: "#1976d2", fontSize: 12, fontWeight: "600" },
  subject: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
    color: "#333",
  },
  details: { color: "#666", fontSize: 14 },
  empty: { textAlign: "center", marginTop: 30, color: "#888" },
});
