import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Lấy lịch học theo sinh viên
export const fetchScheduleByStudent = createAsyncThunk(
  "schedule/fetchScheduleByStudent",
  async (MaSV, thunkAPI) => {
    try {
      const response = await fetch(
        `http://172.20.10.5:3000/api/thoikhoabieu/sinhvien/${MaSV}`
      );
      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data; // danh sách lịch học
    } catch (error) {
      return thunkAPI.rejectWithValue("Không kết nối được server");
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    schedule: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSchedule: (state) => {
      state.schedule = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH SCHEDULE
      .addCase(fetchScheduleByStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScheduleByStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
        state.error = null;
      })
      .addCase(fetchScheduleByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể tải lịch học sinh viên";
      });
  },
});

export const { clearSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
