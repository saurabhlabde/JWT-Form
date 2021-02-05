import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginA } from "../state/Action";

const Login = ({ history }) => {
  const getLoginData = useSelector((state) => state);
  const unmounted = useRef(false);
  const dispatch = useDispatch();
  const [LoginVal, setLoginVal] = useState({
    UsernameOrEmail: "",
    Password: "",
  });

  const [loginData, setLoginData] = useState({});

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setLoginVal((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLoginData.LoginR.then((data) => {
        return setLoginData(data);
      });
    };

    fetchData();
    return () => {
      unmounted.current = true;
    };
  }, [getLoginData]);

  const handelLogin = async () => {
    if (LoginVal.UsernameOrEmail !== "" && LoginVal.Password !== "") {
      try {
        dispatch(LoginA(LoginVal));
        localStorage.setItem("token", loginData.token);
      } catch (error) {
        console.log("error is:", error);
      }
      if (localStorage.getItem("token")) {
        history.push("/");
      }
    } else {
      console.log("username,email or password is null");
    }
  };

  return (
    <>
      <div className="login_form rl_f">
        <h1 className="login_heading rl_h">Login</h1>
        <div className="login_input rl_i">
          <input
            type="text"
            placeholder="Username Or Email id"
            name="UsernameOrEmail"
            value={LoginVal.UsernameOrEmail}
            onChange={handelInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            value={LoginVal.Password}
            onChange={handelInputChange}
          />
          <button className="login_btn" onClick={handelLogin}>
            Login
          </button>
        </div>
        <div className="hn_a">
          <p>
            i haven't an account? <Link to="/register">register.</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
