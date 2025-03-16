import { createSlice } from "@reduxjs/toolkit";

const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    tenantData: null,
  },
  reducers: {
    setTenantData(state, action) {
      state.tenantData = action.payload;
    },
    clearTenant(state) {
      state.tenantData = null;
    },
  },
});

export const { setTenantData, clearTenant } = tenantSlice.actions;
export default tenantSlice.reducer;
