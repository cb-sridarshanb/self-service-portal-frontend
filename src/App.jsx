import { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  const [count, setCount] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [showView, setShowView] = useState("signin");

  const changeView = (route) => {
    console.log("Executing change View");
    setShowView(route);
  };

  const saveUserDetails = (userDetails) => {
    console.log("Executing save user details");
    setUserDetails(Object.assign({}, userDetails));
  };

  console.log("Executing app component");

  return (
    <div className="App">
      <header>
        <h1>Self Service Portal</h1>
      </header>
      {showView === "signin" ? (
        <SignIn changeView={changeView} saveUserDetails={saveUserDetails} />
      ) : showView === "register" ? (
        <Register changeView={changeView} saveUserDetails={saveUserDetails} />
      ) : showView === "home" ? (
        <Home userDetails={userDetails} changeView={changeView} />
      ) : null}
    </div>
  );
}

export default App;
