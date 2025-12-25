import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'http://192.168.100.156:3000/api/giangvien';

export const fetchGiangVien = createAsyncThunk('gv/fetch', async () => {
  const res = await fetch(API);
  return res.json();
});

export const addGiangVien = createAsyncThunk('gv/add', async (data) => {
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return data;
});

export const updateGiangVien = createAsyncThunk('gv/update', async (data) => {
  await fetch(`${API}/${data.MaGV}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return data;
});

export const deleteGiangVien = createAsyncThunk('gv/delete', async (MaGV) => {
  await fetch(`${API}/${MaGV}`, { method: 'DELETE' });
  return MaGV;
});

const slice = createSlice({
  name: 'giangVien',
  initialState: { list: [] },
  extraReducers: b => {
    b.addCase(fetchGiangVien.fulfilled, (s,a)=>{s.list=a.payload})
     .addCase(addGiangVien.fulfilled, (s,a)=>{s.list.push(a.payload)})
     .addCase(updateGiangVien.fulfilled, (s,a)=>{
       const i=s.list.findIndex(g=>g.MaGV===a.payload.MaGV);
       if(i!==-1) s.list[i]=a.payload;
     })
     .addCase(deleteGiangVien.fulfilled,(s,a)=>{
       s.list=s.list.filter(g=>g.MaGV!==a.payload);
     });
  }
});

export default slice.reducer;
