import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import scoreReducer from "./scoreSlice";
import subjectSlice from "./subjectSlice";
import khoaReducer from './slices/khoaSlice';
import lopReducer from './slices/lopSlice';
import giangVienReducer from './slices/giangvienSlice';
import monHocReducer from './slices/monhocSlice';
import taikhoanReducer from './slices/taikhoanSlice';
import adminScoreReducer from "./slices/adminScoreSlice";

export const mystore = configureStore({
    reducer: {
        auth: authReducer,
        score: scoreReducer,
        subject: subjectSlice,
        
        
        
        
        
        
        
        
        
        
        
        
        khoa: khoaReducer,
        lop: lopReducer,
        giangVien: giangVienReducer,
        monHoc: monHocReducer,
        taikhoan: taikhoanReducer,
        adminScore: adminScoreReducer
    },
});