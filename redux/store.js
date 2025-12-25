import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import scoreReducer from "./scoreSlice";
import subjectReducer from "./subjectSlice";
import scheduleReducer from "./scheduleSlice";
import studentReducer from "./studentSlice";
import lopGiangVienReducer from "./lectorRedux/lopGiangVienSlice";
import sinhVienGiangVienReducer from "./lectorRedux/sinhVienGiangVienSlice";
import lichDayGiangVienReducer from "./lectorRedux/lichDayGiangVienSlice";
import monHocGiangVienReducer from "./lectorRedux/monHocGiangVienSlice";
import giangVienInfoReducer from "./lectorRedux/giangVienInfoSlice";
import attendanceReducer from "./lectorRedux/attendanceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    score: scoreReducer,
    subject: subjectReducer,
    schedule: scheduleReducer,
    student: studentReducer,
    lopGiangVien: lopGiangVienReducer,
    sinhVienGiangVien: sinhVienGiangVienReducer,
    lichDayGiangVien: lichDayGiangVienReducer,
    monHocGiangVien: monHocGiangVienReducer,
    giangVienInfo: giangVienInfoReducer,
    attendance: attendanceReducer,
  },
});

export default store;