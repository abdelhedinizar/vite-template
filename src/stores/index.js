import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import basketReducer from './slices/BasketSlice';
import dishReducer from './slices/DishSlice';
import tableReducer from './slices/TableSlice';
import reviewsReducer from './slices/ReviewsSlice';

// Configuration for basket persistence
const basketPersistConfig = {
  key: 'basket',
  storage,
  whitelist: ['items'], // Only persist the items array
};

// Persist table so it stays across sessions
const tablePersistConfig = {
  key: 'table',
  storage,
};

// Configuration for the root reducer
const rootReducer = combineReducers({
  categories: dishReducer,
  basket: persistReducer(basketPersistConfig, basketReducer),
  table: persistReducer(tablePersistConfig, tableReducer),
  reviews: reviewsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
