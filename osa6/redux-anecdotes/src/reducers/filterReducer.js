import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    fitlerReducer(state, action) {
      return action.payload
      }
    }
  }
)

export const { fitlerReducer } = filterSlice.actions;

export default filterSlice.reducer
