import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [firstName, setFirstName] = useState(
    localStorage.getItem("first_name") || "user"
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loginError, setLoginError] = useState(null);

  const login = async (email, password) => {
    const data = { email, password };
    console.log("Attempting login");
    console.log(email, password);
    axios
      .post("/api/user/authenticate", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          console.log("Log in success");
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("token", response.data.token);
          setFirstName(response.data.first_name);
          setToken(response.data.jwt);
          window.location.href = "/home";
        }
      })
      .catch((error) => {
        console.log(error.response);
        setLoginError(error.response.data || null);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setFirstName(null);
  };

  // Set auth token for all requests if it exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ firstName, token, login, logout, loginError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
