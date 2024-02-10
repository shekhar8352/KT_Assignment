import { useState, useEffect } from 'react';
import axios from 'axios';

const useUpdateRoom = () => {
  const [updateRoomResult, setUpdateRoomResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

    const updateRoom = async (roomId, device_id ) => {
      try {
        setUpdateRoomResult({ success: null, data: null, errors: null, loading: true });

        const response = await axios.put(`http://localhost:8000/api/room/edit/${roomId}`, {
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

  return { updateRoom, ...updateRoomResult };
};

export default useUpdateRoom;
