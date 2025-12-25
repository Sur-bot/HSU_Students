import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://localhost:3000/api/taikhoan";

export const fetchTaiKhoan = createAsyncThunk(
  "taikhoan/fetch",
  async () => {
    const res = await fetch(API);
    return await res.json();
  }
);

export const addTaiKhoan = createAsyncThunk(
  "taikhoan/add",
  async (data) => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return data;
  }
);

export const updateTaiKhoan = createAsyncThunk(
  "taikhoan/update",
  async (data) => {
    await fetch(`${API}/${data.TenDangNhap}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return data;
  }
);

export const deleteTaiKhoan = createAsyncThunk(
  "taikhoan/delete",
  async (TenDangNhap) => {
    await fetch(`${API}/${TenDangNhap}`, { method: "DELETE" });
    return TenDangNhap;
  }
);

const slice = createSlice({
  name: "taiKhoan",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchTaiKhoan.fulfilled, (s, a) => {
      s.list = a.payload;
    });

    b.addCase(addTaiKhoan.fulfilled, (s, a) => {
      s.list.push(a.payload);
    });

    b.addCase(updateTaiKhoan.fulfilled, (s, a) => {
      const i = s.list.findIndex(
        (t) => t.TenDangNhap === a.payload.TenDangNhap
      );
      if (i !== -1) s.list[i] = a.payload;
    });

    b.addCase(deleteTaiKhoan.fulfilled, (s, a) => {
      s.list = s.list.filter(
        (t) => t.TenDangNhap !== a.payload
      );
    });
  },
});

export default slice.reducer;
