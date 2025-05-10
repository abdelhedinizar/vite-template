import { configureStore } from '@reduxjs/toolkit';

import basketReducer from './slices/BasketSlice';
import dishReducer from './slices/DishSlice';

const store = configureStore({
  reducer: {
    categories: dishReducer,
    basket: basketReducer,
    // Add more reducers here...
  },
});

export default store;
