'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { DirectionsCar, Videocam, VideocamOff, Refresh } from '@mui/icons-material';

export default function CarCount({ cameraOn, setCameraOn, time }) {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Fetch vehicle count
  const fetchVehicleCount = () => {
    setLoading(true);
    fetch('http://localhost:4000/count')
      .then((res) => res.json())
      .then((data) => {
        setVehicleCount(data.count);
        setLastUpdated(new Date().toLocaleTimeString());
      })
      .catch(() => setVehicleCount(0))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const vehicleInterval = setInterval(fetchVehicleCount, 3000);
    return () => clearInterval(vehicleInterval);
  }, []);

  const handleManualRefresh = () => {
    fetchVehicleCount();
  };

  return (
    <>
      {loading && <LinearProgress color="primary" sx={{ mb: 2 }} />}
      
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          backgroundColor: '#000',
          border: '1px solid #333',
          p: 1,
          position: 'relative',
          width: '100%',
          height: { xs: 400, md: 600 },
          overflow: 'hidden',
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: 1,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Chip
            label={`YOLOv8 Live Feed — ${time}`}
            size="small"
            sx={{
              backgroundColor: '#00c853',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '0.7rem'
            }}
          />
          <Box>
            <Tooltip title={cameraOn ? 'Turn off camera' : 'Turn on camera'}>
              <IconButton
                onClick={() => setCameraOn((prev) => !prev)}
                size="small"
                sx={{
                  backgroundColor: cameraOn ? '#d32f2f' : '#388e3c',
                  color: '#fff',
                  mr: 1,
                  '&:hover': {
                    backgroundColor: cameraOn ? '#b71c1c' : '#2e7d32',
                  },
                }}
              >
                {cameraOn ? <VideocamOff fontSize="small" /> : <Videocam fontSize="small" />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh vehicle count">
              <IconButton
                onClick={handleManualRefresh}
                size="small"
                sx={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                <Refresh fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {cameraOn ? (
          <iframe
            src="http://localhost:4000/video_feed"
            title="YOLOv8 Stream"
            width="100%"
            height="100%"
            allow="fullscreen"
            style={{
              border: 'none',
              borderRadius: '0.5rem',
              zIndex: 1,
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#121212',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#aaa',
              fontSize: '1.2rem',
            }}
          >
            <VideocamOff sx={{ fontSize: '2rem', mr: 1 }} />
            Live Camera Disabled
          </Box>
        )}

        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.5,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Chip
            icon={<DirectionsCar />}
            label={`Vehicles Detected: ${vehicleCount}`}
            color="primary"
            variant="filled"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: 'rgba(25, 118, 210, 0.8)'
            }}
          />
          <Typography variant="caption" sx={{ color: '#aaa' }}>
            Last updated: {lastUpdated}
          </Typography>
        </Box>
      </Paper>
    </>
  );
}