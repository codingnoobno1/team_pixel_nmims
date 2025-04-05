'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Card,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
  Grid,
  Paper,
} from '@mui/material';
import TrafficLight from './TrafficLight';

export default function MonitorTab({ id }) {
  const [color, setColor] = useState('red');
  const [autoCycle, setAutoCycle] = useState(false);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [cameraOn, setCameraOn] = useState(true);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    let interval;
    if (autoCycle) {
      interval = setInterval(() => {
        setColor((prev) =>
          prev === 'red' ? 'green' : prev === 'green' ? 'yellow' : 'red'
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoCycle]);

  useEffect(() => {
    const vehicleInterval = setInterval(() => {
      fetch('http://localhost:4000/count')
        .then((res) => res.json())
        .then((data) => setVehicleCount(data.count))
        .catch(() => setVehicleCount(0));
    }, 3000);
    return () => clearInterval(vehicleInterval);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        px: 6,
        py: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Traffic Monitoring Dashboard
      </Typography>

      <Typography variant="subtitle1" mb={4} color="text.secondary">
        Real-time YOLOv8 Vehicle Detection & Live Stream | Time: {time}
      </Typography>

      <Grid container spacing={4} direction="column">
        {/* Live Camera Feed - Full Width */}
        <Grid item xs={12}>
          <Card
            sx={{
              width: '100%',
              borderRadius: 4,
              boxShadow: 6,
              p: 3,
              backgroundColor: '#fff',
              position: 'relative',
            }}
          >
            <Typography
              sx={{
                color: '#00ff00',
                fontSize: '0.9rem',
                mb: 2,
              }}
            >
              YOLOv8 Live Feed — {time}
            </Typography>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 300, md: 500 },
                border: '2px solid #444',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              {cameraOn ? (
                <iframe
                  src="http://localhost:4000/video_feed"
                  title="YOLOv8 Stream"
                  width="100%"
                  height="100%"
                  allow="fullscreen"
                  style={{
                    border: 'none',
                    borderRadius: '1rem',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    fontSize: '1.2rem',
                  }}
                >
                  Live Camera Disabled
                </Box>
              )}

              <Button
                onClick={() => setCameraOn((prev) => !prev)}
                variant="contained"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  backgroundColor: cameraOn ? '#d32f2f' : '#388e3c',
                  fontSize: '0.75rem',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: cameraOn ? '#b71c1c' : '#2e7d32',
                  },
                }}
              >
                {cameraOn ? 'Turn Off' : 'Turn On'}
              </Button>

              <Typography
                sx={{
                  position: 'absolute',
                  bottom: 14,
                  left: 20,
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                Vehicles Detected: {vehicleCount}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Traffic Light + Controls - Scrollable Section */}
        <Grid item xs={12}>
          <Card
            sx={{
              width: '100%',
              borderRadius: 4,
              boxShadow: 4,
              p: 4,
              backgroundColor: '#ffffff',
              maxHeight: 600,
              overflowY: 'auto',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Signal Controller
            </Typography>

            <TrafficLight color={color} />

            <FormControlLabel
              control={
                <Switch
                  checked={autoCycle}
                  onChange={(e) => setAutoCycle(e.target.checked)}
                  color="primary"
                />
              }
              label="Enable Auto Cycling"
              sx={{ mt: 3 }}
            />

            <Typography mt={3} mb={1}>
              Manual Override
            </Typography>

            <Stack direction="row" spacing={2} mb={2}>
              {['red', 'yellow', 'green'].map((c) => (
                <Button
                  key={c}
                  onClick={() => setColor(c)}
                  disabled={autoCycle}
                  variant={color === c ? 'contained' : 'outlined'}
                  color={
                    c === 'red' ? 'error' : c === 'yellow' ? 'warning' : 'success'
                  }
                  sx={{ width: '80px', fontWeight: 'bold', borderRadius: 2 }}
                >
                  {c.toUpperCase()}
                </Button>
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              <Typography variant="body2">
                <b>Current Light:</b>{' '}
                <span style={{ color: color }}>{color.toUpperCase()}</span>
              </Typography>
              <Typography variant="body2">
                <b>Camera Status:</b> {cameraOn ? '🟢 Active' : '🔴 Inactive'}
              </Typography>
              <Typography variant="body2">
                <b>Vehicle Count:</b> Updates every 3s
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
