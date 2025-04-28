import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firstName, setFirstName] = useState(
    localStorage.getItem("first_name") || "user"
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginError, setLoginError] = useState(null);
  const [isReady, setReady] = useState(false);

  const login = async (email, password) => {
    const data = { email, password };
    console.log("Attempting login");
    console.log(email, password);
    axios
      .post("/api/user/authenticate", data)
      .then((response) => {
        console.log("hi");
        console.log(response);
        if (response.status == 200) {
          console.log("Log in success");
          console.log(response.data.jwt);
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("token", response.data.jwt);
          setFirstName(response.data.first_name);
          setToken(response.data.jwt);
          window.location.href = "/home";
        }
      })
      .catch((error) => {
        console.log("uh oh");
        console.log(error.response);
        setLoginError(error.response.data || null);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("first_name");

    if (token) {
      setToken(token);
      setFirstName(firstName || "user");
    }

    // Mark auth as ready whether token exists or not
    setReady(true);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("first_name");
    setToken(null);
    setFirstName(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ firstName, token, login, logout, loginError, isReady }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
