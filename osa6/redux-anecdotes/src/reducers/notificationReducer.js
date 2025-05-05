import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    sendNotification(state, action){
      return action.payload
    },
    resetNotification(){
      return initialState;
    }
  }
})

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(sendNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, (seconds * 1000))
  }
}

export const { sendNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer