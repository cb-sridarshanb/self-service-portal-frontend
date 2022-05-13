import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import {useState,useEffect} from "react";
import styles from "./Register.module.css";

const Register = ({changeView, saveUserDetails}) => {
    // const [errors,setErrors] = useState({
    //     email:false,
    // })
    const [userDetails,setUserDetails] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        firstName:"",
        lastName:"",
    });

    const setEmail = (e) => {
        console.log(e.target.value)
        setUserDetails(prevState => ({...prevState,email:e.target.value}));
    }

    const setPassword = (e) => {
        console.log(e.target.value)
        setUserDetails(prevState => ({...prevState,password:e.target.value}));
    }

    const setConfirmedPassword = (e) => {
        console.log(e.target.value)
        setUserDetails(prevState => ({...prevState,confirmPassword:e.target.value}));
    }

    const setFirstName = (e) => {
        console.log(e.target.value)
        setUserDetails(prevState => ({...prevState,firstName:e.target.value}));
    }

    const setLastName = (e) => {
        console.log(e.target.value)
        setUserDetails(prevState => ({...prevState,lastName:e.target.value}));
    }

    const registerAccount = () => {
        console.log("Inside function");
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@chargebee.com/g;
        if(userDetails.email.length === 0 || !userDetails.email.match(emailPattern)){
            alert("Invalid email");
            return;
        }
        if(userDetails.password.length === 0 || !userDetails.confirmPassword.length === 0){
            alert("Password not entered");
            return;
        }
        if(userDetails.password !== userDetails.confirmPassword){
            alert("Passwords do not match");
            return;
        }
        if(userDetails.firstName.length === 0 || userDetails.lastName.length === 0){
            alert("Fields are empty");
            return;
        }
        fetch("http://localhost:8080/portal/signup",{
            method:"post",
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body:JSON.stringify({
                email:userDetails.email,
                password:userDetails.password,
                firstName:userDetails.firstName,
                lastName:userDetails.lastName,
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
        <h2 className={styles.title}>Register</h2>
        <form className={styles.bg}>
            <TextField required type="email" id="outlined-email" label="Email" variant="outlined" onChange={setEmail}/>
            <TextField required type="password" id="outlined-password" label="Password" variant="outlined" onChange={setPassword}/>
            <TextField required type="password" id="outlined-confirm-pwd" label="Confirm Password" variant="outlined" onChange={setConfirmedPassword}/>
            <TextField required id="outlined-firstname" label="First Name" variant="outlined" onChange={setFirstName}/>
            <TextField required id="outlined-lastname" label="Last Name" variant="outlined" onChange={setLastName}/>
            <Button variant="contained" onClick={registerAccount}>Register</Button>
        </form>
        <p>or</p>
        <Button onClick={() => changeView("signin")}>Sign In</Button>
    </div>
    )
}

export default Register;