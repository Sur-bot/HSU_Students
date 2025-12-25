import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk fetch danh sách môn học + thời khóa biểu theo giảng viên
export const fetchMonHocGiangVien = createAsyncThunk(
  'giangVien/fetchMonHocGiangVien',
  async (MaGV, thunkAPI) => {
    try {
      const response = await fetch(`http://192.168.100.156:3000/api/monhoc/giangvien/${MaGV}`);
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData);
      }
      const data = await response.json();
      return data; // mảng kết quả từ API
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const monHocGiangVienSlice = createSlice({
  name: 'monHocGiangVien',
  initialState: {
    monHoc: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMonHoc: (state) => {
      state.monHoc = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonHocGiangVien.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonHocGiangVien.fulfilled, (state, action) => {
        state.loading = false;
        state.monHoc = action.payload;
      })
      .addCase(fetchMonHocGiangVien.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMonHoc } = monHocGiangVienSlice.actions;
export default monHocGiangVienSlice.reducer;