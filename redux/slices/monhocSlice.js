import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API = "http://192.168.100.156:3000/api/monhoc";

export const fetchMonHoc = createAsyncThunk("monhoc/fetch", async () => {
  const res = await fetch(API);
  return await res.json();
});

export const addMonHoc = createAsyncThunk("monhoc/add", async (data) => {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return data;
});

export const updateMonHoc = createAsyncThunk(
  "monhoc/update",
  async (data) => {
    await fetch(`${API}/${data.MaMH}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return data;
  }
);

export const deleteMonHoc = createAsyncThunk(
  "monhoc/delete",
  async (MaMH) => {
    await fetch(`${API}/${MaMH}`, { method: "DELETE" });
    return MaMH;
  }
);

const slice = createSlice({
  name: "monHoc",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchMonHoc.fulfilled, (s, a) => {
      s.list = a.payload;
    });

    b.addCase(addMonHoc.fulfilled, (s, a) => {
      s.list.push(a.payload);
    });

    b.addCase(updateMonHoc.fulfilled, (s, a) => {
      const i = s.list.findIndex((m) => m.MaMH === a.payload.MaMH);
      if (i !== -1) s.list[i] = a.payload;
    });

    b.addCase(deleteMonHoc.fulfilled, (s, a) => {
      s.list = s.list.filter((m) => m.MaMH !== a.payload);
    });
  },
});

export default slice.reducer;
