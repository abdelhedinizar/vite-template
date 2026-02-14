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
    removeAtIndex: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.items.length) {
        state.items.splice(index, 1);
      }
    },
    clear: (state) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeAtIndex, clear } = basketSlice.actions;
export default basketSlice.reducer;
