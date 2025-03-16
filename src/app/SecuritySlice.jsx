import { createSlice } from "@reduxjs/toolkit";

const securitySlice = createSlice({
  name: "security",
  initialState: {
    securityData: null,
  },
  reducers: {
    setSecurityData(state, action) {
      state.securityData = action.payload;
    },
    clearSecurityData(state) {
      state.securityData = null;
    },
  },
});

export const { setSecurityData, clearSecurityData } = securitySlice.actions;
export default securitySlice.reducer;
