import { useState } from 'react';
import axios from 'axios';

const useMisState = () => {
  const [changeMISStateResult, setChangeMISStateResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  const changeMISState = async (deviceId, mis) => {
    try {
      setChangeMISStateResult({ success: null, data: null, errors: null, loading: true });

      const response = await axios.put(`http://localhost:8000/api/device/change-mis/${deviceId}`, {
        mis,
      });

      setChangeMISStateResult({
        success: true,
        data: response.data,
        errors: null,
        loading: false,
      });
    } catch (error) {
      const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

      setChangeMISStateResult({ success: false, data: null, errors, loading: false });
    }
  };

  return { changeMISState, ...changeMISStateResult };
};

export default useMisState;
