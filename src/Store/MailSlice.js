import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    inboxMails: [],
    sentMails: [],
    markUnRead: [],
  },
  reducers: {
    AllinboxMails(state, action) {
      state.inboxMails = action.payload;
    },
    AddsentMails(state, action) {
      state.sentMails = action.payload;
    },
    ReadData(state, action) {
      state.markUnRead = action.payload;
    },
  },
});

export const mailSliceAction = mailSlice.actions;
export default mailSlice.reducer;
