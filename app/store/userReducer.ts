import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  value: number;
  commentMode: boolean;
}

const initialState: UserState = {
  value: 0,
  commentMode: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    toogleCommentMode: (state) => {
      state.commentMode = !state.commentMode;
    },
  },
});

export const { increment, decrement, incrementByAmount, toogleCommentMode } =
  userReducer.actions;

export default userReducer.reducer;
