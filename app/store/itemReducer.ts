import { createSlice, configureStore } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "modal",
  initialState: {
    item: {},
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setItem } = itemSlice.actions;

const store = configureStore({
  reducer: itemSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));

export default {
  store: store,
  setItem: (data: any) => {
    store.dispatch(setItem(data));
  },
  getItem: () => {
    return store.getState().item;
  },
};
