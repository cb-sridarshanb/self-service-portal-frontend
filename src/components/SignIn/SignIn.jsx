import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "./SignIn.module.css";

const SignIn = ({ changeView, saveUserDetails }) => {
  const [signInDetails, setSignInDetails] = useState({
    email: "",
    password: "",
  });

  const setEmail = (e) => {
    setSignInDetails((prevState) => ({ ...prevState, email: e.target.value }));
  };

  const setPassword = (e) => {
    setSignInDetails((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const resetForm = () => {
    console.log("called");
    setSignInDetails({ email: "", password: "" });
  };

  const signInPortal = () => {
    console.log("Inside function");
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@chargebee.com/g;
    if (
      signInDetails.email.length === 0 ||
      !signInDetails.email.match(emailPattern)
    ) {
      alert("Invalid email");
      return;
    }
    if (signInDetails.password.length === 0) {
      alert("Password not entered");
      return;
    }
    fetch("http://localhost:8080/portal/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: signInDetails.email,
        password: signInDetails.password,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          saveUserDetails(data);
          changeView("home");
        } else {
          resetForm();
          alert("Invalid Credentials");
          throw new Error("Invalid credentials");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className={styles.signin}>
      <h2 className={styles.title}>Sign In</h2>
      <form className={styles.bg}>
        <TextField
          required
          type="email"
          id="outlined-email"
          label="Email"
          variant="outlined"
          onChange={setEmail}
          value={signInDetails.email}
        />
        <TextField
          required
          type="password"
          id="outlined-password"
          label="Password"
          variant="outlined"
          onChange={setPassword}
          value={signInDetails.password}
        />
        <Button variant="contained" onClick={signInPortal}>
          Sign In
        </Button>
      </form>
      <p>or</p>
      <Button onClick={() => changeView("register")}>Register</Button>
    </div>
  );
};

export default SignIn;
