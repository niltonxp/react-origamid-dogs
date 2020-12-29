import React from 'react'
import { Route, Routes } from 'react-router-dom'

import LoginForm from './LoginForm'
import LoginCreate from './LoginCreate'
import LoginPasswordLost from './LoginPasswordLost'
import LoginPasswordReset from './LoginPasswordReset'

const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="create" element={<LoginCreate />} />
        <Route path="forget-password" element={<LoginPasswordLost />} />
        <Route path="reset-password" element={<LoginPasswordReset />} />
      </Routes>
    </div>
  )
}

export default Login
