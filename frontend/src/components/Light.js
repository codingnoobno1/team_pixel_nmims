'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Divider,
  Switch,
  FormControlLabel,
  Chip,
  Paper
} from '@mui/material';
import {
  Settings,
  Traffic,
  Lightbulb
} from '@mui/icons-material';
import TrafficLight from './TrafficLight';

export default function LightController({ time }) {
  const [color, setColor] = useState('red');
  const [autoCycle, setAutoCycle] = useState(false);

  // Auto cycling traffic light
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

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#f8fafc',
        borderRadius: 3,
        height: { xs: 'auto', md: 600 },
        overflow: 'auto',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Lightbulb color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Signal Controller
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Chip 
          label={autoCycle ? 'AUTO' : 'MANUAL'} 
          size="small" 
          color={autoCycle ? 'success' : 'warning'}
          variant="outlined"
        />
      </Box>

      {/* Traffic Light */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'center',
        backgroundColor: '#f1f5f9',
        p: 3,
        borderRadius: 2,
        border: '1px solid #e2e8f0'
      }}>
        <TrafficLight color={color} size="large" />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={autoCycle}
            onChange={(e) => setAutoCycle(e.target.checked)}
            color="primary"
          />
        }
        label={
          <Typography variant="body2" fontWeight="medium">
            Enable Auto Cycling
          </Typography>
        }
        sx={{ 
          mt: 1,
          backgroundColor: autoCycle ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
          p: 1,
          borderRadius: 1
        }}
      />

      <Typography variant="subtitle2" mt={3} mb={1} fontWeight="bold" color="text.secondary">
        MANUAL OVERRIDE
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {['red', 'yellow', 'green'].map((c) => (
          <Button
            key={c}
            onClick={() => setColor(c)}
            disabled={autoCycle}
            variant={color === c ? 'contained' : 'outlined'}
            color={c === 'red' ? 'error' : c === 'yellow' ? 'warning' : 'success'}
            sx={{
              flex: 1,
              fontWeight: 'bold',
              borderRadius: 2,
              py: 1.5,
              textTransform: 'uppercase',
              letterSpacing: 1,
              boxShadow: color === c ? 2 : 0,
              opacity: autoCycle ? 0.7 : 1
            }}
            startIcon={
              c === 'red' ? <Settings sx={{ transform: 'rotate(90deg)' }} /> :
              c === 'yellow' ? <Settings /> : <Traffic />
            }
          >
            {c}
          </Button>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={2}>
        <Paper sx={{ 
          backgroundColor: '#f1f5f9',
          p: 2,
          borderRadius: 2,
          border: '1px solid #e2e8f0'
        }}>
          <Typography variant="subtitle2" fontWeight="bold" mb={1} color="text.secondary">
            SYSTEM STATUS
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">
                <b>Current Light:</b>
              </Typography>
              <Chip 
                label={color.toUpperCase()} 
                size="small" 
                sx={{ 
                  backgroundColor: color === 'red' ? '#f44336' : 
                                color === 'yellow' ? '#ff9800' : '#4caf50',
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">
                <b>Current Time:</b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {time}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}