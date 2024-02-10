import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import useUser from '../hooks/user/useUser';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });

  const { registerUser, success, errors, loading } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
  };

  React.useEffect(() => {
    if (success) {
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
      });
    }
  }, [success]);

  return (
    <div>
      <h4>Create User</h4>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem"}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" disabled={loading} sx={{ marginTop: 2 }}>
          {loading ? 'Creating User...' : 'Create User'}
        </Button>
      </form>
      {errors && <div style={{ color: 'red', marginTop: 2 }}>{errors[0].msg}</div>}
      {success && <div style={{ color: 'green', marginTop: 2 }}>User created successfully!</div>}
    </div>
  );
};

export default CreateUser;
