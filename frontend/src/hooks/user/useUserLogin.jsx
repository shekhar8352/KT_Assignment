// useUserLogin.js
import { useState } from 'react';
import axios from 'axios';

const useUserLogin = () => {
  const [loginResult, setLoginResult] = useState({
    success: null,
    token: null,
    errors: null,
    loading: false,
  });

  const loginUser = async (username, password) => {
    try {
      setLoginResult({ success: null, token: null, errors: null, loading: true });

      const response = await axios.post('http://localhost:8000/api/users/login', {
        username,
        password,
      });

      const { token } = response.data;

      setLoginResult({ success: true, token, errors: null, loading: false });
    } catch (error) {
      const errors = error.response ? error.response.data.errors : [{ msg: 'Server error' }];

      setLoginResult({ success: false, token: null, errors, loading: false });
    }
  };

  return { loginUser, ...loginResult };
};

export default useUserLogin;
