import { useState } from 'react';
import axios from 'axios';

const useCreateRoom = () => {
  const [createRoomResult, setCreateRoomResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

    const createRoom = async ( name, user_id, device_id = null ) => {
      try {
        setCreateRoomResult({ success: null, data: null, errors: null, loading: true });

        const response = await axios.post('http://localhost:8000/api/room/create', {
          name,
          user_id,
          device_id,
        });

        setCreateRoomResult({
          success: true,
          data: response.data,
          errors: null,
          loading: false,
        });
      } catch (error) {
        const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

        setCreateRoomResult({ success: false, data: null, errors, loading: false });
      }
    };

  return { createRoom, ...createRoomResult };
};

export default useCreateRoom;
