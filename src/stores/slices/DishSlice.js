import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDishes = createAsyncThunk('dishes/fetchDishes', async () => {
  const token = localStorage.getItem('custom-auth-token');
  const dishesResponse = await axios.get(
    `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/dishs?fields=_id%2Cname%2Cingredients%2Cprice%2Ccategory%2CAccompaniments%2CPreparationTime%2CSpiceLevel%2CSize%2Cstatus%2ClikesCount%2CisLikedByMe`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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

export const toggleDishLike = createAsyncThunk(
  'dishes/toggleLike',
  async ({ dishId, like }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('custom-auth-token');
      if (!token) throw new Error('Missing auth token');
      const method = like ? 'post' : 'delete';
      await axios({
        method,
        url: `${import.meta.env.VITE_REACT_APP_BACK_API_URL}/likes/${dishId}`,
        headers: { Authorization: `Bearer ${token}` },
      });
      return { dishId, like };
    } catch (err) {
      return rejectWithValue({ dishId, like, message: err.message });
    }
  }
);

const updateDishLikeState = (state, dishId, like, rollback = false) => {
  state.categories.forEach((cat) => {
    cat.dishes = cat.dishes.map((dish) => {
      const id = dish._id || dish.id;
      if (id === dishId) {
        const alreadyLiked = !!dish.isLikedByMe;
        let likesCount = dish.likesCount ?? 0;
        if (like) {
          if (!alreadyLiked) likesCount += 1;
        } else {
          if (alreadyLiked && likesCount > 0) likesCount -= 1;
        }
        // If rollback invert effect
        if (rollback) {
          if (like) {
            // We attempted like but failed: revert
            if (alreadyLiked && likesCount > 0) likesCount -= 1; // revert increment if it happened
            return { ...dish, isLikedByMe: false, likesCount };
          } else {
            // We attempted unlike but failed: restore liked
            return { ...dish, isLikedByMe: true, likesCount: likesCount + 1 };
          }
        }
        return { ...dish, isLikedByMe: like, likesCount };
      }
      return dish;
    });
  });
};

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
        const imageMap = Object.fromEntries(
          action.payload.map((dish) => [dish._id, { image: dish.image, likesCount: dish.likesCount, isLikedByMe: dish.isLikedByMe }])
        );
        state.categories.forEach((category) => {
          category.dishes = category.dishes.map((dish) => ({
            ...dish,
            image: imageMap[dish._id]?.image || dish.image || null,
            likesCount: dish.likesCount ?? imageMap[dish._id]?.likesCount ?? 0,
            isLikedByMe: dish.isLikedByMe ?? imageMap[dish._id]?.isLikedByMe ?? false,
          }));
        });
      })
      // Optimistic like toggle
      .addCase(toggleDishLike.pending, (state, action) => {
        const { dishId, like } = action.meta.arg;
        updateDishLikeState(state, dishId, like, false);
      })
      .addCase(toggleDishLike.fulfilled, (state, action) => {
        // Nothing needed; state already updated optimistically
      })
      .addCase(toggleDishLike.rejected, (state, action) => {
        const { dishId, like } = action.payload || action.meta.arg;
        // Rollback
        updateDishLikeState(state, dishId, like, true);
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export default dishSlice.reducer;
