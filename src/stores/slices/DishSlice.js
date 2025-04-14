import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async () => {
  const dishesResponse = await axios.get(
    `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/dishs?fields=_id%2Cname%2Cingredients%2Cprice%2Ccategory%2CAccompaniments%2CPreparationTime%2CSpiceLevel%2CSize%2Cstatus`
  );
  const categoriesResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/categories`);
  const categories = await categoriesResponse.data.data.categories;
  // for each category I will add dishs for each category
  categories.forEach((category) => {
    category.dishes = dishesResponse.data.data.dishs.filter((dish) => dish.category === category.name);
  });
  return categories;
});

export const fetchDishImages = createAsyncThunk('dishes/fetchDishImages', async () => {
  const imageResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_BACK_API_URL}/dishs?fields=_id%2Cimage`);
  return imageResponse.data.data.dishs; // Array of {_id, image}
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
      })
      .addCase(fetchDishImages.fulfilled, (state, action) => {
        const imageMap = Object.fromEntries(action.payload.map((dish) => [dish._id, dish.image]));

        state.categories.forEach((category) => {
          category.dishes = category.dishes.map((dish) => ({
            ...dish,
            image: imageMap[dish._id] || null,
          }));
        });
      });
  },
});

export default dishSlice.reducer;
