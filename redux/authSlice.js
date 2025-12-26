import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk để gọi API login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch("http://10.102.70.202:3000/api/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.error);
      }

      // data = { token, user }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      console.log("LOGOUT");
      state.token = null;
      state.role = null;
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;      
        state.token = action.payload.token;      
        state.role = action.payload.user.role;     
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đăng nhập thất bại";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
