import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//GIẢNG VIÊN - LẤY DANH SÁCH LỚP ĐANG DẠY
export const fetchDanhSachLop = createAsyncThunk(
  "lopGiangVien/fetchDanhSachLop",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const maGV = state.auth.user?.maGV;

      if (!maGV) {
        return thunkAPI.rejectWithValue("Không tìm thấy mã giảng viên");
      }

      const response = await fetch(
        `http://10.102.70.202:3000/api/giangvien/lop/${maGV}`
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

const lopGiangVienSlice = createSlice({
  name: "lopGiangVien",
  initialState: {
    danhSachLop: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDanhSachLop: (state) => {
      state.danhSachLop = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDanhSachLop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDanhSachLop.fulfilled, (state, action) => {
        state.loading = false;
        state.danhSachLop = action.payload;
        state.error = null;
      })
      .addCase(fetchDanhSachLop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lấy danh sách lớp thất bại";
      });
  },
});

export const { clearDanhSachLop } = lopGiangVienSlice.actions;
export default lopGiangVienSlice.reducer;
