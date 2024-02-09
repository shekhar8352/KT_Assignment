import { useState, useEffect } from 'react';
import axios from 'axios';

const useUpdateRoom = (roomId, { name, device_id }) => {
  const [updateRoomResult, setUpdateRoomResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  useEffect(() => {
    const updateRoom = async () => {
      try {
        setUpdateRoomResult({ success: null, data: null, errors: null, loading: true });

        const response = await axios.put(`http://localhost:8000/api/rooms/edit/${roomId}`, {
          name,
          device_id,
        });

        setUpdateRoomResult({
          success: true,
          data: response.data,
          errors: null,
          loading: false,
        });
      } catch (error) {
        const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

        setUpdateRoomResult({ success: false, data: null, errors, loading: false });
      }
    };

    updateRoom();
  }, [roomId, name, device_id]);

  return { ...updateRoomResult };
};

export default useUpdateRoom;
