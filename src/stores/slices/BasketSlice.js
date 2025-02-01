import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: {
    items: [],
  },
  reducers: {
    addToBasket: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, remove, clear } = basketSlice.actions;
export default basketSlice.reducer;
