import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RegisterA } from "../state/Action";
const Register = () => {
  const getRegisterData = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [registerData, setRegisterData] = useState({});
  const [RegisterVal, setRegisterVal] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    EmailId: "",
    Password: "",
  });
  const fetchData = async () => {
    await getRegisterData.RegisterR.then((data) => {
      return setRegisterData(data);
    });
  };
  useEffect(() => {
    fetchData();
    if (registerData.AccountCreated) {
      setRegisterVal({
        FirstName: "",
        LastName: "",
        Username: "",
        EmailId: "",
        Password: "",
      });
      history.push("/login");
    }
  }, [getRegisterData]);

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterVal((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  console.log(registerData, "registerData");
  const handelRegister = () => {
    if (
      (RegisterVal.FirstName !== "",
      RegisterVal.LastName !== "",
      RegisterVal.Username !== "",
      RegisterVal.EmailId !== "",
      RegisterVal.Password !== "")
    ) {
      dispatch(RegisterA(RegisterVal));
    } else {
      console.log("input filed is null");
    }
  };

  return (
    <>
      <div className="register_form rl_f">
        <h1 className="register_heading rl_h">Register</h1>
        <div className="register_input rl_i">
          <input
            type="text"
            placeholder="First Name"
            name="FirstName"
            value={RegisterVal.FirstName}
            onChange={handelInputChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="LastName"
            value={RegisterVal.LastName}
            onChange={handelInputChange}
          />
          <input
            type="text"
            placeholder="Username"
            name="Username"
            value={RegisterVal.Username}
            onChange={handelInputChange}
          />
          <input
            type="email"
            placeholder="Email Id"
            name="EmailId"
            value={RegisterVal.EmailId}
            onChange={handelInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            value={RegisterVal.Password}
            onChange={handelInputChange}
          />
          <button className="register_btn" onClick={handelRegister}>
            Register
          </button>
        </div>
        <div className="hn_a">
          <p>
            i have an account? <Link to="/login">login.</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
