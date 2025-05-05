import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    sendNotificaton(state, action){
      return action.payload
    }
  }
})

export const { sendNotificaton } = notificationSlice.actions
export default notificationSlice.reducer