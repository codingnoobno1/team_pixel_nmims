'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const lightStyles = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  marginBottom: '10px',
  opacity: 0.3,
  transition: 'opacity 0.5s',
};

export default function TrafficLight({ route }) {
  const [color, setColor] = useState('red');
  const [carCount, setCarCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/lightstatus?route=${route}`);
      const data = await res.json();
      setColor(data.signalStatus);
      setCarCount(data.carCount);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000); // Poll every 3 sec

    return () => clearInterval(interval);
  }, [route]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#222',
        padding: '1rem',
        borderRadius: '1rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
      }}
    >
      <Box
        sx={{ ...lightStyles, backgroundColor: 'red', opacity: color === 'red' ? 1 : 0.3 }}
      />
      <Box
        sx={{ ...lightStyles, backgroundColor: 'yellow', opacity: color === 'yellow' ? 1 : 0.3 }}
      />
      <Box
        sx={{ ...lightStyles, backgroundColor: 'green', opacity: color === 'green' ? 1 : 0.3 }}
      />
      <Typography variant="caption" color="white" mt={1}>
        Cars: {carCount}
      </Typography>
    </Box>
  );
}
