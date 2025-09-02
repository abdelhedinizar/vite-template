import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTable: (state, action) => {
      const { id, name } = action.payload || {};
      state.id = id ?? null;
      state.name = name ?? id ?? null; // allow passing only id
    },
    clearTable: (state) => {
      state.id = null;
      state.name = null;
    },
  },
});

export const { setTable, clearTable } = tableSlice.actions;
export default tableSlice.reducer;
