import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 1. Action Lấy thông tin giảng viên (Giống fetchStudentInfo)
export const fetchGiangVienInfo = createAsyncThunk(
  "giangVienInfo/fetchInfo",
  async (MaGV, thunkAPI) => {
    try {
      const response = await fetch(`http://172.20.10.5:3000/api/giangvien/${MaGV}`);
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error || "Không thể lấy thông tin");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 2. Action Cập nhật số điện thoại
export const updateGiangVienPhone = createAsyncThunk(
  "giangVienInfo/updatePhone",
  async ({ MaGV, SoDienThoai }, thunkAPI) => {
    try {
      const response = await fetch(`http://172.20.10.5:3000/api/giangvien/${MaGV}/phone`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ SoDienThoai }),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error || "Cập nhật thất bại");
      }
      return { ...data, newPhone: SoDienThoai }; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const giangVienInfoSlice = createSlice({
  name: "giangVienInfo",
  initialState: {
    giangVienInfo: null, // Nơi lưu trữ thông tin hiện lên màn hình
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  reducers: {
    resetGiangVienInfo: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý FETCH
      .addCase(fetchGiangVienInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGiangVienInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.giangVienInfo = action.payload; // Đổ dữ liệu vào đây để hiện lên UI
      })
      .addCase(fetchGiangVienInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Xử lý UPDATE
      .addCase(updateGiangVienPhone.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateGiangVienPhone.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        // Cập nhật lại số điện thoại trong store ngay lập tức để UI đồng bộ
        if (state.giangVienInfo) {
          state.giangVienInfo.SoDienThoai = action.payload.newPhone;
        }
      })
      .addCase(updateGiangVienPhone.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Cập nhật thất bại";
      });
  },
});

export const { resetGiangVienInfo } = giangVienInfoSlice.actions;
export default giangVienInfoSlice.reducer;