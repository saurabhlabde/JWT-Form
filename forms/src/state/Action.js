import { LOAD_DATA, LOAD_DATA_FAIL, REGISTER, LOGIN } from "./Type";

export const LoadDataA = (Token) => ({
  type: LOAD_DATA,
  payload: {
    Token: Token,
  },
});

export const LoadDataFailA = (error) => ({
  type: LOAD_DATA_FAIL,
  payload: {
    error,
  },
});

export const RegisterA = (RegisterVal) => ({
  type: REGISTER,
  payload: {
    RegisterVal,
  },
});

export const LoginA = (LoginVal) => ({
  type: LOGIN,
  payload: {
    LoginVal,
  },
});
