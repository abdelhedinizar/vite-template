import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import basketReducer from './slices/BasketSlice';
import dishReducer from './slices/DishSlice';

// Configuration for basket persistence
const basketPersistConfig = {
  key: 'basket',
  storage,
  whitelist: ['items'], // Only persist the items array
};

// Configuration for the root reducer
const rootReducer = combineReducers({
  categories: dishReducer,
  basket: persistReducer(basketPersistConfig, basketReducer),
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
