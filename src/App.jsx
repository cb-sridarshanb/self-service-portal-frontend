import { useEffect, useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(() => {
    if (sessionStorage.getItem("user-details")) {
      return JSON.parse(sessionStorage.getItem("user-details")).user;
    } else {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (sessionStorage.getItem("user-authenticated")) {
      return JSON.parse(sessionStorage.getItem("user-authenticated"))
        .isAuthenticated;
    } else {
      return false;
    }
  });
  const [userToken, setUserToken] = useState(() => {
    if (sessionStorage.getItem("user-token")) {
      return JSON.parse(sessionStorage.getItem("user-token")).jwtToken;
    } else {
      return {};
    }
  });

  // useEffect(() => {
  //   console.log("executing session storage for first time when app loads");
  //   if (sessionStorage.getItem("user-authenticated")) {
  //     const value = JSON.parse(sessionStorage.getItem("user-authenticated"));
  //     console.log(value.isAuthenticated);
  //     setIsAuthenticated(value.isAuthenticated);
  //   }
  // }, []);

  useEffect(() => {
    console.log("When state changes for authentication");
    console.log(isAuthenticated);
    updateAuthenticatedDetails();
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("When state changes for user");
    console.log(user);
    updateUserDetails();
  }, [user]);

  const updateAuthenticatedDetails = () => {
    sessionStorage.setItem(
      "user-authenticated",
      JSON.stringify({ isAuthenticated })
    );
  };

  const updateUserDetails = () => {
    sessionStorage.setItem("user-details", JSON.stringify({ user }));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home
                  user={user}
                  setUser={setUser}
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  userToken={userToken}
                />
              ) : (
                <SignIn
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  user={user}
                  setUser={setUser}
                  setUserToken={setUserToken}
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              <Register
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      {/* 
      {showView === "signin" ? (
        <SignIn changeView={changeView} saveuser={saveuser} />
      ) : showView === "register" ? (
        <Register changeView={changeView} saveuser={saveuser} />
      ) : showView === "home" ? (
        <Home user={user} changeView={changeView} />
      ) : null} */}
    </div>
  );
}

export default App;
