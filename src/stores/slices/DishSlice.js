import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async () => {
  const dishesResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/dishs`);
  const categoriesResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/categories`);
  const categories = await categoriesResponse.data.data.categories;
  // for each category I will add dishs for each category
  categories.forEach((category) => {
    category.dishes = dishesResponse.data.data.dishs.filter((dish) => dish.category === category.name);
  });
  return categories;
});

const dishSlice = createSlice({
  name: 'categories',
  initialState: { categories: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dishSlice.reducer;
