import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Lấy điểm theo mã sinh viên
export const fetchScoresByStudent = createAsyncThunk(
  "score/fetchScoresByStudent",
  async (MaSV, thunkAPI) => {
    try {
      const response = await fetch(
        `http://192.168.100.156:3000/api/diem/sinhvien/${MaSV}`
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data; // danh sách điểm
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const scoreSlice = createSlice({
  name: "score",
  initialState: {
    scores: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearScores: (state) => {
      state.scores = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH SCORES
      .addCase(fetchScoresByStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScoresByStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.scores = action.payload;
        state.error = null;
      })
      .addCase(fetchScoresByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể tải điểm sinh viên";
      });
  },
});

export const { clearScores } = scoreSlice.actions;
export default scoreSlice.reducer;
