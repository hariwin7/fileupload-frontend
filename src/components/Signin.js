import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { set, SET_TOKEN, SET_USER } from "../context/actions";
import { globalContext } from "../context/globalContext";
import { signIn } from "../Api/AuthApi";

import "../css/Signup.css";

const Singup = () => {
  const { globalDispatch } = useContext(globalContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    type: "",
    message: "",
  });
  const [password, setPassword] = useState("");
  const history = useHistory();

  const validateFields = () => {
    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let flag = false;
    if (!email) {
      setError({
        type: "email",
        message: "Cannot be blank",
      });
      flag = true;
    } else if (!reg.test(email)) {
      setError({
        type: "email",
        message: "Not a valid email",
      });
      flag = true;
    } else if (!password) {
      setError({
        type: "password",
        message: "Cannot be blank",
      });
      flag = true;
    } else if (password.length < 8) {
      setError({
        type: "password",
        message: "Password must be atleast 8 characters long",
      });
      flag = true;
    }
    return flag;
  };
  const handleSignin = () => {
    if (validateFields()) {
      return;
    }
    const body = {
      email,
      password,
    };
    signIn(body)
      .then((res) => {
        globalDispatch(set(SET_USER, res.user));
        globalDispatch(set(SET_TOKEN, res.token));
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError({
          type: err.response.data.error[0].path,
          message: err.response.data.error[0].message,
        });
      });
  };
  return (
    <div className="signup">
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      {error.type === "email" && (
        <Alert severity="error">{error.message}!</Alert>
      )}
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error.type === "password" && (
        <Alert severity="error">{error.message}!</Alert>
      )}
      <div className="sign-div">
        <button className="signin-button" onClick={handleSignin}>
          Sign in
        </button>
        <Link to="/signup">New User? Sign Up</Link>
      </div>
    </div>
  );
};

export default Singup;
