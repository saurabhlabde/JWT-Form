import axios from "axios";
import {
  LOAD_DATA,
  LOAD_DATA_FAIL,
  REGISTER,
  REGISTER_FAIL,
  LOGIN,
  LOGIN_FAIL,
} from "./Type";

const defaultLoadData = {
  IsLogin: false,
  LoginUser: {},
  Message: "",
};

const defaultRegister = {
  AccountCreated: false,
  Error: null,
  Message: "",
};

const defaultLogin = {
  IsLogin: false,
  LoginUser: {},
  Message: "",
  token: null,
};

export const LoadDataR = async (state = defaultLoadData, action) => {
  switch (action.type) {
    case LOAD_DATA:
      let users;
      try {
        const authAxios = axios.create({
          baseURL: "http://localhost:5000",
          headers: {
            Authorization: `Bearer ${action.Token}`,
          },
        });
        users = await authAxios.get("user", {
          withCredentials: true,
        });
      } catch (error) {
        console.log(error, "rro");
      }
      return { ...state, ...users };
    case LOAD_DATA_FAIL:
      return { ...state, Message: action.payload.error };
    default:
      return state;
  }
};

export const RegisterR = async (state = defaultRegister, action) => {
  switch (action.type) {
    case REGISTER:
      let res;
      try {
        res = await axios.post("register", action.payload.RegisterVal);
      } catch (error) {}
      return { ...state, ...res.data };
    default:
      return state;
  }
};

export const LoginR = async (state = defaultLogin, action) => {
  switch (action.type) {
    case LOGIN:
      let res;
      try {
        res = await axios.post("login", action.payload.LoginVal, {
          withCredentials: true,
        });
      } catch (error) {}
      return { ...state, ...res.data };
    default:
      return state;
  }
};
