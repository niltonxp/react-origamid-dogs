import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";

import { UserContext } from "../../UserContext";

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="create" element={<LoginCreate />} />
        <Route path="forget-password" element={<LoginPasswordLost />} />
        <Route path="reset-password" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  );
};

export default Login;
