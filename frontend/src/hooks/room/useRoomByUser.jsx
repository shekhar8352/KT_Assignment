import { useState, useEffect } from 'react';
import axios from 'axios';

const useRoomByUser = (userId) => {
  const [roomsByUserResult, setRoomsByUserResult] = useState({
    success: null,
    data: null,
    errors: null,
    loading: false,
  });

  useEffect(() => {
    const fetchRoomsByUser = async () => {
      try {
        setRoomsByUserResult({ success: null, data: null, errors: null, loading: true });

        const response = await axios.get(`http://localhost:8000/api/rooms/user/${userId}`);

        setRoomsByUserResult({
          success: true,
          data: response.data,
          errors: null,
          loading: false,
        });
      } catch (error) {
        const errors = error.response ? error.response.data : [{ msg: 'Server error' }];

        setRoomsByUserResult({ success: false, data: null, errors, loading: false });
      }
    };

    fetchRoomsByUser();
  }, [userId]);

  return { ...roomsByUserResult };
};

export default useRoomByUser;
