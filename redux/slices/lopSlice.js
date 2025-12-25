import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://192.168.100.156:3000/api/lop';

/* ===== CŨ – GIỮ NGUYÊN ===== */
export const fetchLop = createAsyncThunk('lop/fetch', async () => {
  const res = await fetch(API);
  return res.json();
});

export const addLop = createAsyncThunk('lop/add', async (data) => {
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return data;
});

export const updateLop = createAsyncThunk(
  'lop/update',
  async ({ MaLop, TenLop, MaKhoa }) => {
    await fetch(`${API}/${MaLop}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ TenLop, MaKhoa }),
    });
    return { MaLop, TenLop, MaKhoa };
  }
);

export const deleteLop = createAsyncThunk('lop/delete', async (MaLop) => {
  await fetch(`${API}/${MaLop}`, { method: 'DELETE' });
  return MaLop;
});

/* ===== MỚI – LỚP THEO MÔN (✅ FIX Ở ĐÂY) ===== */
export const fetchLopByMonHoc = createAsyncThunk(
  'lop/fetchByMonHoc',
  async (MaMH) => {
    const res = await fetch(`${API}/monhoc/${MaMH}`); // ✅ ĐÚNG API
    return res.json();
  }
);

const slice = createSlice({
  name: 'lop',
  initialState: {
    list: [],        // quản lý lớp
    byMonHoc: [],    // picker lớp theo môn
  },
  reducers: {
    clearLopByMonHoc(state) {
      state.byMonHoc = [];
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchLop.fulfilled, (s, a) => {
      s.list = a.payload;
    });

    b.addCase(fetchLopByMonHoc.fulfilled, (s, a) => {
      s.byMonHoc = a.payload; // ✅ KHÔNG ảnh hưởng list
    });

    b.addCase(addLop.fulfilled, (s, a) => {
      s.list.push(a.payload);
    });

    b.addCase(updateLop.fulfilled, (s, a) => {
      const i = s.list.findIndex(l => l.MaLop === a.payload.MaLop);
      if (i !== -1) s.list[i] = a.payload;
    });

    b.addCase(deleteLop.fulfilled, (s, a) => {
      s.list = s.list.filter(l => l.MaLop !== a.payload);
    });
  },
});

export const { clearLopByMonHoc } = slice.actions;
export default slice.reducer;
