import { useState } from 'react';
import axios from 'axios';

const useAdminLogin = () => {
  const [loginResult, setLoginResult] = useState({
    success: null,
    token: null,
    errors: null,
    loading: false,
  });

  const loginAdmin = async (username, password) => {
    try {
      setLoginResult({ success: null, token: null, errors: null, loading: true });

      const response = await axios.post('http://localhost:8000/api/admin/login', {
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

  return { loginAdmin, ...loginResult };
};

export default useAdminLogin;
