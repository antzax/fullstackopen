import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'test notif',
  reducers: {
    sendNotification(state, action){
      return action.payload
    }
  }
})

export const { sendNotification } = notificationSlice.actions
export default notificationSlice.reducer