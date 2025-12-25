import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://192.168.100.156:3000/api/diem";

/* ===== THUNKS ===== */

// Lấy bảng điểm theo môn + lớp (ADMIN)
export const fetchAdminClassScores = createAsyncThunk(
  "adminScore/fetchClassScores",
  async ({ MaMH, MaLop }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({ MaMH, MaLop }).toString();
      const res = await fetch(`${API}/adminlop?${query}`);

      if (!res.ok) {
        throw new Error("Không lấy được bảng điểm lớp");
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// GPA theo mã SV (ADMIN)
export const fetchAdminGPA = createAsyncThunk(
  "adminScore/fetchGPA",
  async (MaSV, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/admingpa/${MaSV}`);

      if (!res.ok) {
        throw new Error("Không lấy được GPA");
      }

      return await res.json(); // { MaSV, GPA, TongTinChi }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const adminScoreSlice = createSlice({
  name: "adminScore",
  initialState: {
    classScores: [],
    gpaResult: null,
    loading: false,
    error: null
  },
  reducers: {
    clearAdminScores: (state) => {
      state.classScores = [];
      state.gpaResult = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* ===== CLASS SCORES ===== */
      .addCase(fetchAdminClassScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminClassScores.fulfilled, (state, action) => {
        state.loading = false;
        state.classScores = action.payload;
      })
      .addCase(fetchAdminClassScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===== GPA ===== */
      .addCase(fetchAdminGPA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminGPA.fulfilled, (state, action) => {
        state.loading = false;
        state.gpaResult = action.payload;
      })
      .addCase(fetchAdminGPA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAdminScores } = adminScoreSlice.actions;
export default adminScoreSlice.reducer;
