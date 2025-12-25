import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Lấy danh sách môn học theo sinh viên
export const fetchSubjectsByStudent = createAsyncThunk(
  "subject/fetchSubjectsByStudent",
  async (MaSV, thunkAPI) => {
    try {
      const response = await fetch(
        `http://192.168.100.156:3000/api/monhoc/sinhvien/${MaSV}`
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data; // danh sách môn học
    } catch (error) {
      return thunkAPI.rejectWithValue("Không kết nối được server");
    }
  }
);

const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjects: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSubjects: (state) => {
      state.subjects = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH SUBJECTS
      .addCase(fetchSubjectsByStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectsByStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
        state.error = null;
      })
      .addCase(fetchSubjectsByStudent.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Không thể tải danh sách môn học";
      });
  },
});

export const { clearSubjects } = subjectSlice.actions;
export default subjectSlice.reducer;
