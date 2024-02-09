import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetUserById = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user by ID:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserById();
  }, [userId]);

  return { user, loading };
};

export default useGetUserById;
