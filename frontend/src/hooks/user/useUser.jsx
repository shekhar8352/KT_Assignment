import { useState } from 'react';
import axios from 'axios';

const useUser = () => {
  const [registrationResult, setRegistrationResult] = useState({
    success: null,
    token: null,
    errors: null,
    loading: false,
  });

  const registerUser = async (userData) => {
    try {
      setRegistrationResult({
        success: null,
        token: null,
        errors: null,
        loading: true,
      });

      const response = await axios.post('http://localhost:8000/api/users/register', userData);

      const { token } = response.data;
      localStorage.setItem("Token", token);

      setRegistrationResult({ success: true, token, errors: null, loading: false });
    } catch (error) {
      const errors = error.response
        ? error.response.data.errors
        : [{ msg: 'Server error' }];

      setRegistrationResult({ success: false, token: null, errors, loading: false });
    }
  };

  return { registerUser, ...registrationResult };
};

export default useUser;
