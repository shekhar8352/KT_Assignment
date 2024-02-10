// useFetchDeviceById.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useDeviceById = (deviceId) => {
  const [deviceByIdResult, setDeviceByIdResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: true,
  });

  useEffect(() => {
    const fetchDeviceById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/device/${deviceId}`);

        setDeviceByIdResult({
          success: true,
          data: response.data,
          errors: null,
          loading: false,
        });
      } catch (error) {
        const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

        setDeviceByIdResult({ success: false, data: null, errors, loading: false });
      }
    };

    fetchDeviceById();
  }, [deviceId]);

  return { ...deviceByIdResult };
};

export default useDeviceById;
