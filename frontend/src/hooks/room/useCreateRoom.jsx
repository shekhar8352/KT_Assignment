// useCreateRoom.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCreateRoom = ({ name, user_id, device_id }) => {
  const [createRoomResult, setCreateRoomResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  useEffect(() => {
    const createRoom = async () => {
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

    createRoom();
  }, [name, user_id, device_id]);

  return { ...createRoomResult };
};

export default useCreateRoom;
