import { useState, useEffect } from 'react';
import axios from 'axios';

const useDeleteRoom = (roomId) => {
  const [deleteRoomResult, setDeleteRoomResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  useEffect(() => {
    const deleteRoom = async () => {
      try {
        setDeleteRoomResult({ success: null, data: null, errors: null, loading: true });

        const response = await axios.delete(`http://localhost:8000/api/rooms/delete/${roomId}`);

        setDeleteRoomResult({
          success: true,
          data: response.data,
          errors: null,
          loading: false,
        });
      } catch (error) {
        const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

        setDeleteRoomResult({ success: false, data: null, errors, loading: false });
      }
    };

    deleteRoom();
  }, [roomId]);

  return { ...deleteRoomResult };
};

export default useDeleteRoom;
