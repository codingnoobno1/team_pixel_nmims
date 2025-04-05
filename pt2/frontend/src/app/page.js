'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    try {
      if (userId === 'admin' && password === 'password') {
        router.push('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url("https://img.freepik.com/free-photo/anxiety-induced-by-traffic_23-2150981883.jpg?t=st=1743843496~exp=1743847096~hmac=414b20bdc31bd4ba56dcb5a4d1f9425b60d8c5ef2373b81e0768208a1fedd02f&w=1380")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        px: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          position: 'absolute',
          top: 30,
          color: 'white',
          fontWeight: 'bold',
          textShadow: '2px 2px 6px black',
        }}
      >
        AI FAST WAY
      </Typography>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 400,
          backdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(255,255,255,0.85)',
        }}
      >
        <Typography variant="h5" gutterBottom>
          FastWay Login
        </Typography>
        <TextField
          label="User ID"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
