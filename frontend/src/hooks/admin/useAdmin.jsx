import { useState } from 'react';
import axios from 'axios';

const useAdmin = () => {
  const [registrationResult, setRegistrationResult] = useState({
    success: null,
    token: null,
    errors: null,
    loading: false,
  });

  const registerAdmin = async (username, password) => {
    try {
      setRegistrationResult({ success: null, token: null, errors: null, loading: true });

      const response = await axios.post('http://localhost:8000/api/admin/register', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("Token", token);

      setRegistrationResult({ success: true, token, errors: null, loading: false });
    } catch (error) {
      const errors = error.response ? error.response.data.errors : ['Server error'];

      setRegistrationResult({ success: false, token: null, errors, loading: false });
    }
  };

  return { registerAdmin, ...registrationResult };
};

export default useAdmin;
