import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { AnyAction, Store } from "redux";

// Import your reducers here
import userReducer from "./userReducer";

// Define the state of your Redux store
export interface RootState {
  user: {
    value: number;
    commentMode: boolean;
  };
}

// Create your Redux store with the reducers
const makeStore: MakeStore<Store<RootState, AnyAction>> = () =>
  configureStore({
    reducer: {
      user: userReducer,
    },
  });

// Export the wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
