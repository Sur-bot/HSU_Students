import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://192.168.100.156:3000/api/yeucaudiem";

/* ===== GET theo giảng viên ===== */
export const fetchYeuCauDiem = createAsyncThunk(
  "yeuCauDiem/fetch",
  async (MaGV, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/giangvien/${MaGV}`);
      if (!res.ok) throw new Error("Fetch failed");
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

/* ===== GET các yêu cầu đang chờ duyệt ===== */
export const fetchYeuCauDiemChoDuyet = createAsyncThunk(
  "yeuCauDiem/fetchChoDuyet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/choduyet`);
      if (!res.ok) throw new Error("Fetch cho duyet failed");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===== Duyệt yêu cầu: insert vào Diem + cập nhật Status ===== */
export const duyetYeuCauDiem = createAsyncThunk(
  "yeuCauDiem/duyet",
  async ({ MaSV, MaMH, MaGV, DiemGK, DiemCK }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/duyet/${MaSV}/${MaMH}/${MaGV}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ DiemGK, DiemCK }),
      });
      if (!res.ok) throw new Error("Duyệt thất bại");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===== Từ chối yêu cầu ===== */
export const tuChoiYeuCauDiem = createAsyncThunk(
  "yeuCauDiem/tucho",
  async ({ MaSV, MaMH, MaGV }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/tucho/${MaSV}/${MaMH}/${MaGV}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Từ chối thất bại");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ===== POST ===== */
export const addYeuCauDiem = createAsyncThunk(
  "yeuCauDiem/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Add failed");
      return await res.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

/* ===== DELETE ===== */
export const deleteYeuCauDiem = createAsyncThunk(
  "yeuCauDiem/delete",
  async ({ MaSV, MaMH, MaGV }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API}/${MaSV}/${MaMH}/${MaGV}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");
      return { MaSV, MaMH, MaGV };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const yeuCauDiemSlice = createSlice({
  name: "yeuCauDiem",
  initialState: {
    list: [],          // danh sách tất cả
    listChoDuyet: [],  // danh sách chờ duyệt
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ===== FETCH theo giảng viên =====
      .addCase(fetchYeuCauDiem.fulfilled, (state, action) => {
        state.list = action.payload || [];
      })

      // ===== FETCH yêu cầu chờ duyệt =====
      .addCase(fetchYeuCauDiemChoDuyet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchYeuCauDiemChoDuyet.fulfilled, (state, action) => {
        state.loading = false;
        state.listChoDuyet = action.payload || [];
      })
      .addCase(fetchYeuCauDiemChoDuyet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== ADD =====
      .addCase(addYeuCauDiem.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // ===== DELETE =====
      .addCase(deleteYeuCauDiem.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (i) =>
            !(
              i.MaSV === action.payload.MaSV &&
              i.MaMH === action.payload.MaMH &&
              i.MaGV === action.payload.MaGV
            )
        );
        state.listChoDuyet = state.listChoDuyet.filter(
          (i) =>
            !(
              i.MaSV === action.payload.MaSV &&
              i.MaMH === action.payload.MaMH &&
              i.MaGV === action.payload.MaGV
            )
        );
      })

      // ===== Duyệt =====
      .addCase(duyetYeuCauDiem.fulfilled, (state, action) => {
        state.list = state.list.map((i) =>
          i.MaSV === action.payload.MaSV &&
          i.MaMH === action.payload.MaMH &&
          i.MaGV === action.payload.MaGV
            ? action.payload
            : i
        );
        state.listChoDuyet = state.listChoDuyet.filter(
          (i) =>
            !(
              i.MaSV === action.payload.MaSV &&
              i.MaMH === action.payload.MaMH &&
              i.MaGV === action.payload.MaGV
            )
        );
      })

      // ===== Từ chối =====
      .addCase(tuChoiYeuCauDiem.fulfilled, (state, action) => {
        state.list = state.list.map((i) =>
          i.MaSV === action.payload.MaSV &&
          i.MaMH === action.payload.MaMH &&
          i.MaGV === action.payload.MaGV
            ? action.payload
            : i
        );
        state.listChoDuyet = state.listChoDuyet.filter(
          (i) =>
            !(
              i.MaSV === action.payload.MaSV &&
              i.MaMH === action.payload.MaMH &&
              i.MaGV === action.payload.MaGV
            )
        );
      });
  },
});

export default yeuCauDiemSlice.reducer;
