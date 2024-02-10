import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching all users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  return { users, loading };
};

export default useGetAllUsers;
