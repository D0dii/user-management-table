import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "src/types/user";

import axios from "axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: undefined,
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.filters.name = action.payload;
    },
    setUsernameFilter: (state, action: PayloadAction<string>) => {
      state.filters.username = action.payload;
    },
    setEmailFilter: (state, action: PayloadAction<string>) => {
      state.filters.email = action.payload;
    },
    setPhoneFilter: (state, action: PayloadAction<string>) => {
      state.filters.phone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const getUsers = (state: UserState) => state.users;
const getFilters = (state: UserState) => state.filters;

export const selectFilteredUsers = createSelector([getUsers, getFilters], (users, filters) => {
  const { name, username, email, phone } = filters;

  return users.filter((user) => {
    return (
      user.name.toLowerCase().includes(name.toLowerCase()) &&
      user.username.toLowerCase().includes(username.toLowerCase()) &&
      user.email.toLowerCase().includes(email.toLowerCase()) &&
      user.phone.includes(phone)
    );
  });
});

export const { setNameFilter, setUsernameFilter, setEmailFilter, setPhoneFilter } = userSlice.actions;

export { userSlice };
