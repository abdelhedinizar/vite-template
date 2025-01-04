import { configureStore } from '@reduxjs/toolkit';

import dishReducer from './slices/DishSlice';

const store = configureStore({
  reducer: {
    categories: dishReducer,
  },
});

export default store;
