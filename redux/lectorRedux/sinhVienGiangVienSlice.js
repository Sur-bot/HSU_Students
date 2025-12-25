import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Lấy danh sách sinh viên trong các lớp giảng viên đang dạy
export const fetchSinhVienGiangVien = createAsyncThunk(
  "giangVien/fetchSinhVien",
  async (_, thunkAPI) => {
    try {
      // 👉 Lấy MaGV từ auth slice
      const state = thunkAPI.getState();
      const maGV = state.auth.user?.maGV;

      if (!maGV) {
        return thunkAPI.rejectWithValue("Không tìm thấy mã giảng viên");
      }

      const response = await fetch(
        `http://172.20.10.5:3000/api/giangvien/sinhvien/${maGV}`
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data; // danh sách sinh viên
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const sinhVienGiangVienSlice = createSlice({
  name: "sinhVienGiangVien",
  initialState: {
    danhSachSinhVien: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDanhSachSinhVien: (state) => {
      state.danhSachSinhVien = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinhVienGiangVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinhVienGiangVien.fulfilled, (state, action) => {
        state.loading = false;
        state.danhSachSinhVien = action.payload;
      })
      .addCase(fetchSinhVienGiangVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lấy danh sách sinh viên thất bại";
      });
  },
});

export const { clearDanhSachSinhVien } = sinhVienGiangVienSlice.actions;

export default sinhVienGiangVienSlice.reducer;
