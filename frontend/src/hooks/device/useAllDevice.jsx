import { useState, useEffect } from 'react';
import axios from 'axios';

const useAllDevices = () => {
  const [allDevicesResult, setAllDevicesResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: true,
  });

  useEffect(() => {
    const fetchAllDevices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/device/all');

        setAllDevicesResult({
          success: true,
          data: response.data,
          errors: null,
          loading: false,
        });
      } catch (error) {
        const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

        setAllDevicesResult({ success: false, data: null, errors, loading: false });
      }
    };

    fetchAllDevices();
  }, []);

  return { ...allDevicesResult };
};

export default useAllDevices;
