import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= FETCH ================= */
export const fetchStudentInfo = createAsyncThunk(
  "student/fetchStudentInfo",
  async (maSV, thunkAPI) => {
    try {
      const res = await fetch(`http://10.102.70.202:3000/api/sinhvien/${maSV}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* ================= UPDATE ================= */
export const updateStudentInfo = createAsyncThunk(
  "student/updateStudentInfo",
  async ({ MaSV, DiaChi, SoDienThoai }, thunkAPI) => {
    try {
      const { studentInfo } = thunkAPI.getState().student;

      const res = await fetch(`http://10.102.70.202:3000/api/sinhvien/${maSV}/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          HoTen: studentInfo.HoTen,
          NgaySinh: studentInfo.NgaySinh,
          GioiTinh: studentInfo.GioiTinh,
          Email: studentInfo.Email,
          MaLop: studentInfo.MaLop,
          TrangThai: studentInfo.TrangThai,
          DiaChi,
          SoDienThoai,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      return { DiaChi, SoDienThoai };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearStudentError(state) {
      state.error = null;
    },
    clearStudent(state) {
      state.studentInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchStudentInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudentInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.studentInfo = action.payload;
      })
      .addCase(fetchStudentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateStudentInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudentInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.studentInfo = {
          ...state.studentInfo,
          DiaChi: action.payload.DiaChi,
          SoDienThoai: action.payload.SoDienThoai,
        };
      })
      .addCase(updateStudentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStudentError, clearStudent } = studentSlice.actions;
export default studentSlice.reducer;
