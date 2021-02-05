import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = ({ history, Token }) => {
  const getLoadData = useSelector((state) => state);
  const unmounted = useRef(false);
  useEffect(() => {
    if (!Token) {
      return history.push("/login");
    }
  }, []);

  const [User, setUser] = useState({
    IsLogin: false,
    LoginUser: {},
    Message: "",
  });

  const fetchUser = async () => {
    try {
      const user = await getLoadData.LoadDataR.then((data) => {
        return data.data;
      });
      if (user) {
        setUser({
          IsLogin: true,
          LoginUser: user.user,
          Message: "Login Successfully!!",
        });
      }
    } catch (error) {
      console.log("H error:", error);
    }
  };

  useEffect(() => {
    if (unmounted) {
      fetchUser();
    }
    return () => {
      unmounted.current = true;
    };
  }, [getLoadData]);

  const handelLogout = async () => {
    try {
      await axios.get("logout", {
        withCredentials: true,
      });
      setUser({
        IsLogin: false,
        LoginUser: {},
        Message: "",
        token: null,
      });
    } catch (error) {}
    localStorage.clear();

    history.push("/logout");
  };

  return (
    <>
      <nav>
        <ul>
          <li className="logo_text">
            <Link to="/">FromIs.com</Link>
          </li>
        </ul>
        <ul>
          {Token ? (
            <>
              <li className="hello_user">
                <p>hello, {User.LoginUser.FirstName}</p>
              </li>
              <li className="li_h" onClick={handelLogout}>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="li_h">
                <Link to="/register">SignUp</Link>
              </li>
              <li className="li_h">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div>
        {Token ? (
          <>
            <div className="home_sec">
              <h1>Welcome Back ...!!</h1>
            </div>
          </>
        ) : (
          <>
            <div className="home_sec">
              <h1>Please Login...!!</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
