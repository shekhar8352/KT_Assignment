// useChangeFanState.js
import { useState } from 'react';
import axios from 'axios';

const useFanState = () => {
  const [changeFanStateResult, setChangeFanStateResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  const changeFanState = async (deviceId, fan) => {
    try {
      setChangeFanStateResult({ success: null, data: null, errors: null, loading: true });

      const response = await axios.put(`http://localhost:8000/api/devices/change-fan/${deviceId}`, {
        fan,
      });

      setChangeFanStateResult({
        success: true,
        data: response.data,
        errors: null,
        loading: false,
      });
    } catch (error) {
      const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

      setChangeFanStateResult({ success: false, data: null, errors, loading: false });
    }
  };

  return { changeFanState, ...changeFanStateResult };
};

export default useFanState;
