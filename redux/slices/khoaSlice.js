import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://192.168.100.156:3000/api/khoa';

export const fetchKhoa = createAsyncThunk('khoa/fetch', async () => {
  const res = await fetch(API);
  return res.json();
});

export const addKhoa = createAsyncThunk('khoa/add', async (data) => {
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return data;
});

export const updateKhoa = createAsyncThunk('khoa/update', async ({ MaKhoa, TenKhoa }) => {
  await fetch(`${API}/${MaKhoa}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ TenKhoa }),
  });
  return { MaKhoa, TenKhoa };
});

export const deleteKhoa = createAsyncThunk('khoa/delete', async (MaKhoa) => {
  await fetch(`${API}/${MaKhoa}`, { method: 'DELETE' });
  return MaKhoa;
});

const khoaSlice = createSlice({
  name: 'khoa',
  initialState: { list: [] },
  extraReducers: builder => {
    builder
      .addCase(fetchKhoa.fulfilled, (s, a) => { s.list = a.payload; })
      .addCase(addKhoa.fulfilled, (s, a) => { s.list.push(a.payload); })
      .addCase(updateKhoa.fulfilled, (s, a) => {
        const i = s.list.findIndex(k => k.MaKhoa === a.payload.MaKhoa);
        if (i !== -1) s.list[i].TenKhoa = a.payload.TenKhoa;
      })
      .addCase(deleteKhoa.fulfilled, (s, a) => {
        s.list = s.list.filter(k => k.MaKhoa !== a.payload);
      });
  },
});

export default khoaSlice.reducer;
