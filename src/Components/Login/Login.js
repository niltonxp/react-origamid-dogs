import React from "react";
import styles from "./Login.module.css";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import NotFound from "../NotFound";

import { UserContext } from "../../UserContext";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="forgot-password" element={<LoginPasswordLost />} />
          <Route path="reset-password" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
