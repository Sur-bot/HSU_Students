import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Địa chỉ API cơ sở (đã sửa theo IP của bạn)
const API_URL = "http://10.102.70.202:3000/api/diemdanh";

// 1. Action Lấy danh sách sinh viên theo tiết học (MaTKB)
// Cấu trúc giống hệt fetchGiangVienInfo
export const fetchStudentsByTKB = createAsyncThunk(
  "attendance/fetchStudents",
  async (maTKB, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/students-by-tkb/${maTKB}`);
      const data = await response.json();
      
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error || "Không thể tải danh sách sinh viên");
      }
      return data; // Trả về mảng danh sách sinh viên
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 2. Action Gửi dữ liệu điểm danh
// Cấu trúc giống hệt updateGiangVienPhone
export const submitAttendance = createAsyncThunk(
  "attendance/submit",
  async (attendanceData, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData),
      });
      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error || "Ghi nhận điểm danh thất bại");
      }
      
      // Trả về data (thường là message thành công)
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    students: [],    // Thay vì giangVienInfo (object) thì đây là students (array)
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  reducers: {
    resetAttendanceStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Xử lý FETCH (fetchStudentsByTKB) ---
      .addCase(fetchStudentsByTKB.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentsByTKB.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload; // Đổ dữ liệu vào state để hiện lên list
      })
      .addCase(fetchStudentsByTKB.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Xử lý UPDATE (submitAttendance) ---
      .addCase(submitAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        // Ở đây không cần cập nhật lại state.students như ví dụ SĐT 
        // vì danh sách sinh viên không thay đổi sau khi điểm danh
      })
      .addCase(submitAttendance.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Lưu điểm danh thất bại";
      });
  },
});

export const { resetAttendanceStatus } = attendanceSlice.actions;
export default attendanceSlice.reducer;