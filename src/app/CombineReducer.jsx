import { combineReducers } from "@reduxjs/toolkit";

import tenantReducer from "./TenantSlice";
import securityReducer from "./SecuritySlice";

const rootReducer = combineReducers({
  tenant: tenantReducer,
  security: securityReducer,
});

export default rootReducer;
