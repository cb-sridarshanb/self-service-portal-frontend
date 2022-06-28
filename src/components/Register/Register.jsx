import TextField from "@mui/material/TextField";
import { Button, styled } from "@mui/material";
import { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../personalinfo.svg";

const CssTextField = styled(TextField)({
  "& fieldset": {
    borderWidth: "2px",
  },
  "& label": {
    color: "#fff",
  },
  "& label.Mui-focused": {
    color: "#fff",
    background: "#03003e",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black",
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

const Register = ({ isAuthenticated, setIsAuthenticated, setUser }) => {
  const navigate = useNavigate();
  // const [errors,setErrors] = useState({
  //     email:false,
  // })
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const setEmail = (e) => {
    setUserDetails((prevState) => ({ ...prevState, email: e.target.value }));
  };

  const setPassword = (e) => {
    setUserDetails((prevState) => ({ ...prevState, password: e.target.value }));
  };

  const setConfirmedPassword = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      confirmPassword: e.target.value,
    }));
  };

  const setFirstName = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      firstName: e.target.value,
    }));
  };

  const setLastName = (e) => {
    setUserDetails((prevState) => ({ ...prevState, lastName: e.target.value }));
  };

  const resetForm = () => {
    console.log("called");
    setUserDetails({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  };

  const registerAccount = () => {
    console.log("Inside function");
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@chargebee.com/g;
    if (
      userDetails.email.length === 0 ||
      !userDetails.email.match(emailPattern)
    ) {
      alert("Invalid email");
      return;
    }
    if (
      userDetails.password.length === 0 ||
      !userDetails.confirmPassword.length === 0
    ) {
      alert("Password not entered");
      return;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (
      userDetails.firstName.length === 0 ||
      userDetails.lastName.length === 0
    ) {
      alert("Fields are empty");
      return;
    }
    fetch("http://localhost:8080/portal/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          // setUser(data);
          // setIsAuthenticated(true);
          navigate("/");
        } else {
          resetForm();
          alert(await response.text());
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className={styles.registerPage}>
      <aside>
        <img src={Image} alt="side-image" />
      </aside>

      <div className={styles.signin}>
        <h2 className={styles.title}>Register</h2>
        <form className={styles.bg}>
          <CssTextField
            required
            type="email"
            id="outlined-email"
            label="Email"
            variant="outlined"
            onChange={setEmail}
            value={userDetails.email}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <CssTextField
            required
            type="password"
            id="outlined-password"
            label="Password"
            variant="outlined"
            onChange={setPassword}
            value={userDetails.password}
          />
          <CssTextField
            required
            type="password"
            id="outlined-confirm-pwd"
            label="Confirm Password"
            variant="outlined"
            onChange={setConfirmedPassword}
            value={userDetails.confirmPassword}
          />
          <CssTextField
            required
            id="outlined-firstname"
            label="First Name"
            variant="outlined"
            onChange={setFirstName}
            value={userDetails.firstName}
          />
          <CssTextField
            required
            id="outlined-lastname"
            label="Last Name"
            variant="outlined"
            onChange={setLastName}
            value={userDetails.lastName}
          />
          <CssButton variant="contained" onClick={registerAccount}>
            Register
          </CssButton>
        </form>
        <p>or</p>
        {/* <Button onClick={() => changeView("signin")}>Sign In</Button> */}
        <Button>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              padding: "0.5rem",
            }}
          >
            Sign In
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Register;
