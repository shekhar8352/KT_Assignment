// useAllocateDevice.js
import { useState } from 'react';
import axios from 'axios';

const useEditDevice = () => {
  const [allocateDeviceResult, setAllocateDeviceResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  const allocateDevice = async (deviceId, name, userId) => {
    try {
      setAllocateDeviceResult({ success: null, data: null, errors: null, loading: true });

      const response = await axios.put(`http://localhost:8000/api/devices/allocate/${deviceId}`, {
        name,
        userId,
      });

      setAllocateDeviceResult({ success: true, data: response.data, errors: null, loading: false });
    } catch (error) {
      const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

      setAllocateDeviceResult({ success: false, data: null, errors, loading: false });
    }
  };

  return { allocateDevice, ...allocateDeviceResult };
};

export default useEditDevice;
