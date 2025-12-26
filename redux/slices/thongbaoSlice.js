import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://10.102.70.202:3000/api/thongbao";

// GET tất cả thông báo
export const fetchThongBao = createAsyncThunk(
  "thongBao/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Fetch failed");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// POST thông báo
export const postThongBao = createAsyncThunk(
  "thongBao/post",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Post failed");
      return await res.json(); // phải trả về object mới tạo
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const thongbaoSlice = createSlice({
  name: "thongBao",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThongBao.pending, (state) => { state.loading = true; })
      .addCase(fetchThongBao.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchThongBao.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(postThongBao.fulfilled, (state, action) => {
        state.list.unshift(action.payload); // thêm thông báo mới lên đầu list
      });
  },
});

export default thongbaoSlice.reducer;
