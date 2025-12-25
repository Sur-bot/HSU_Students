import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLichDayGiangVien = createAsyncThunk(
  "lichDayGiangVien/fetch",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const maGV = state.auth.user?.maGV;

      if (!maGV) {
        return thunkAPI.rejectWithValue("Không tìm thấy mã giảng viên");
      }

      const response = await fetch(
        `http://172.20.10.5:3000/api/giangvien/lichday/${maGV}`
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const lichDayGiangVienSlice = createSlice({
  name: "lichDayGiangVien",
  initialState: {
    lichDay: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearLichDay: (state) => {
      state.lichDay = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLichDayGiangVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLichDayGiangVien.fulfilled, (state, action) => {
        state.loading = false;
        state.lichDay = action.payload;
      })
      .addCase(fetchLichDayGiangVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lấy lịch dạy thất bại";
      });
  },
});

export const { clearLichDay } = lichDayGiangVienSlice.actions;
export default lichDayGiangVienSlice.reducer;
