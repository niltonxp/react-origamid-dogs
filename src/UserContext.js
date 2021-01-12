import React from "react";
import { request, TOKEN_POST, USER_GET, TOKEN_POST_VALIDATE } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const userLogout = React.useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
    setLoading(false);

    window.localStorage.removeItem("token");
    navigate("/login"); //It's not working here
  }, [navigate]);

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const json = await request(url, options);
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });

      const tokenRes = await request(url, options);
      const { token } = tokenRes;

      if (!token) throw new Error(`Error: ${tokenRes.message}`);

      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/account");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_POST_VALIDATE(token);
          const { data } = await request(url, options);
          if (data.status !== 200) throw new Error("Token inválido");

          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]);

  const values = {
    userLogin,
    userLogout,
    data,
    error,
    loading,
    login,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
