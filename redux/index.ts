import { combineReducers } from "redux";
import authReducer from "./auth.slice";
import cartReducer from "./cart.slice";
import messageReducer from "./message.slice";

const rootReducer = combineReducers({
  message: messageReducer,
  cart: cartReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
