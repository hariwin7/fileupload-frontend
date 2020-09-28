import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";
import { signUp } from "../Api/AuthApi";
import "../css/Signup.css";

const Singup = () => {
  const history = useHistory();
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(1);
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    type: "",
    message: "",
  });

  const handleUSerType = (event) => {
    setUserType(parseInt(event.target.value));
  };

  const validateFields = () => {
    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    let flag = false;
    if (!fname) {
      setError({
        type: "firstName",
        message: "Cannot be blank",
      });
      flag = true;
    } else if (!email) {
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
  const handleSignup = () => {
    if (validateFields()) {
      return;
    }
    const body = {
      firstName: fname,
      email,
      userType,
      password,
    };
    signUp(body)
      .then((res) => {
        console.log(res);
        setError({
          type: "success",
          message: "created user",
        });
        setTimeout(() => {
          history.push("/signin");
        }, 500);
      })
      .catch((err) => {
        setError({
          type: err.response.data.error[0].path,
          message: err.response.data.error[0].message,
        });
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError({
      type: "",
      message: "",
    });
  };

  return (
    <div className="signup">
      <input
        placeholder="Your full name"
        onChange={(e) => setFname(e.target.value)}
      />
      {error.type === "firstName" && (
        <Alert severity="error">{error.message}!</Alert>
      )}
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      {error.type === "email" && (
        <Alert severity="error">{error.message}!</Alert>
      )}
      <select placeholder="Sign up as" onChange={handleUSerType}>
        <option value={1}>Admin</option>
        <option value={2}>User</option>
      </select>

      <input
        placeholder="Password (min 8 characters)"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error.type === "password" && (
        <Alert severity="error">{error.message}!</Alert>
      )}
      <button className="signup-button" onClick={handleSignup}>
        Sign up
      </button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error.type === "success"}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {error.message}!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Singup;
