// useCreateDevice.js
import { useState } from 'react';
import axios from 'axios';

const useCreateDevice = () => {
  const [createDeviceResult, setCreateDeviceResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  const createDevice = async (name, alloted_to_user, state) => {
    try {
      setCreateDeviceResult({ success: null, data: null, errors: null, loading: true });

      const response = await axios.post('http://localhost:8000/api/devices/create', {
        name,
        alloted_to_user,
        state,
      });

      setCreateDeviceResult({ success: true, data: response.data, errors: null, loading: false });
    } catch (error) {
      const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

      setCreateDeviceResult({ success: false, data: null, errors, loading: false });
    }
  };

  return { createDevice, ...createDeviceResult };
};

export default useCreateDevice;
