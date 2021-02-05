import { createStore, combineReducers } from "redux";
import { LoadDataR, RegisterR, LoginR } from "./Reducer";

const rootStore = combineReducers({
  LoadDataR,
  RegisterR,
  LoginR,
});

export const store = createStore(rootStore);
