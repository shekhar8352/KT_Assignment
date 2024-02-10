import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserDevices = (userId) => {
  const [userDevicesResult, setUserDevicesResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: true,
  });

  useEffect(() => {
    const fetchUserDevices = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/device/user/${userId}`);

        setUserDevicesResult({
          success: true,
          data: response.data,
          errors: null,
          loading: false,
        });
      } catch (error) {
        const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

        setUserDevicesResult({ success: false, data: null, errors, loading: false });
      }
    };

    fetchUserDevices();
  }, [userId]);

  return { ...userDevicesResult };
};

export default useUserDevices;
