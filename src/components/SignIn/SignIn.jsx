import TextField from "@mui/material/TextField";
import { Button, styled } from "@mui/material";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { useNavigate, Link } from "react-router-dom";
import Image from "../../personalinfo.svg";

const CssTextField = styled(TextField)({
  "& fieldset": {
    borderWidth: "2px",
  },
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#b6b2ff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#03003e",
    },
  },
});

const CssButton = styled(Button)({
  "&.MuiButton-root": {
    background: "#b6b2ff",
    color: "#03003e",
    "&.MuiButton-root:hover": {
      background: "#03003e",
      color: "#b6b2ff",
    },
  },
});

const SignIn = ({
  isAuthenticated,
  setIsAuthenticated,
  user,
  setUser,
  setUserToken,
}) => {
  const navigate = useNavigate();
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
          setUser(data.user);
          setUserToken(data.jwtToken);
          setIsAuthenticated(true);
          navigate("/");
        } else {
          resetForm();
          alert("Invalid Credentials");
          throw new Error("Invalid credentials");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <section className={styles.signinPage}>
      <aside>
        <img src={Image} alt="side-image" />
      </aside>
      <div className={styles.signin}>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.bg}>
          <CssTextField
            required
            type="email"
            id="outlined-email"
            label="Email"
            variant="outlined"
            onChange={setEmail}
            value={signInDetails.email}
          />
          <CssTextField
            required
            type="password"
            id="outlined-password"
            label="Password"
            variant="outlined"
            onChange={setPassword}
            value={signInDetails.password}
          />
          <CssButton variant="contained" onClick={signInPortal}>
            Sign In
          </CssButton>
        </form>
        <p>or</p>
        {/* <Button onClick={() => changeView("register")}>Register</Button> */}
        <Button>
          <Link
            to={"/register"}
            style={{
              textDecoration: "none",
              padding: "0.5rem",
            }}
          >
            Register
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default SignIn;
