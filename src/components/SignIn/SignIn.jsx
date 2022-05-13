import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import {useState,useEffect} from "react";
import styles from "./SignIn.module.css";

const SignIn = ({changeView, saveUserDetails}) => {
    const [signInDetails, setSignInDetails] = useState({
        email:"",
        password:"",
    });

    const setEmail = (e) => {
        console.log(e.target.value)
        setSignInDetails(prevState => ({...prevState,email:e.target.value}));
    }

    const setPassword = (e) => {
        console.log(e.target.value)
        setSignInDetails(prevState => ({...prevState,password:e.target.value}));
    }

    const signInPortal = () => {
        console.log("Inside function");
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@chargebee.com/g;
        if(signInDetails.email.length === 0 || !signInDetails.email.match(emailPattern)){
            alert("Invalid email");
            return;
        }
        if(signInDetails.password.length === 0){
            alert("Password not entered");
            return;
        }
        fetch("http://localhost:8080/portal/login",{
            method:"post",
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
                email:signInDetails.email,
                password:signInDetails.password,
            }),
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data)
            saveUserDetails(data);
            changeView("home");
        })
        .catch(e => console.log(e));
    }
    return (
    <div className={styles.signin}>
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.bg}>
            <TextField required type="email" id="outlined-email" label="Email" variant="outlined" onChange={setEmail}/>
            <TextField required type="password" id="outlined-password" label="Password" variant="outlined" onChange={setPassword}/>
            <Button variant="contained" onClick={signInPortal}>Sign In</Button>
        </form>
        <p>or</p>
        <Button onClick={() => changeView("register")}>Register</Button>
    </div>
    )
}

export default SignIn;