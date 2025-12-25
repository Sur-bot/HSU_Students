import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import scoreReducer from "./scoreSlice";
import scheduleReducer from "./scheduleSlice";
import studentReducer from "./studentSlice";
import lopGiangVienReducer from "./lectorRedux/lopGiangVienSlice";
import sinhVienGiangVienReducer from "./lectorRedux/sinhVienGiangVienSlice";
import lichDayGiangVienReducer from "./lectorRedux/lichDayGiangVienSlice";
import monHocGiangVienReducer from "./lectorRedux/monHocGiangVienSlice";
import subjectSlice from "./subjectSlice";
import khoaReducer from './slices/khoaSlice';
import lopReducer from './slices/lopSlice';
import giangVienReducer from './slices/giangvienSlice';
import monHocReducer from './slices/monhocSlice';
import taikhoanReducer from './slices/taikhoanSlice';
import adminScoreReducer from "./slices/adminScoreSlice";
import yeuCauDiemReducer from "./slices/yeuCauDiemSlice";
import thongBaoReducer from "./slices/thongbaoSlice";
export const mystore = configureStore({
    reducer: {
        auth: authReducer,
        score: scoreReducer,
        subject: subjectSlice,
        schedule: scheduleReducer,
        student: studentReducer,
        lopGiangVien: lopGiangVienReducer,
        sinhVienGiangVien: sinhVienGiangVienReducer,
        lichDayGiangVien: lichDayGiangVienReducer,
        monHocGiangVien: monHocGiangVienReducer,
        khoa: khoaReducer,
        lop: lopReducer,
        giangVien: giangVienReducer,
        monHoc: monHocReducer,
        taikhoan: taikhoanReducer,
        adminScore: adminScoreReducer,
        yeuCauDiem: yeuCauDiemReducer,
        thongBao: thongBaoReducer,
    },
});

