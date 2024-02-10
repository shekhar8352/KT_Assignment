import { useState } from 'react';
import axios from 'axios';

const useLightState = () => {
  const [changeLightStateResult, setChangeLightStateResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  const changeLightState = async (deviceId, light) => {
    try {
      setChangeLightStateResult({ success: null, data: null, errors: null, loading: true });

      const response = await axios.put(`http://localhost:8000/api/device/change-light/${deviceId}`, {
        light,
      });

      setChangeLightStateResult({
        success: true,
        data: response.data,
        errors: null,
        loading: false,
      });
    } catch (error) {
      const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

      setChangeLightStateResult({ success: false, data: null, errors, loading: false });
    }
  };

  return { changeLightState, ...changeLightStateResult };
};

export default useLightState;
