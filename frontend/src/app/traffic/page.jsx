'use client';

import { useState } from 'react';
import Map from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Divider,
  useTheme,
} from '@mui/material';

export default function TrafficPage() {
  const [viewState, setViewState] = useState({
    longitude: 76.7794,
    latitude: 30.7333,
    zoom: 12,
  });

  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(135deg, #f5f5f5 0%, #d6d6d6 100%)',
        py: 5,
        px: 2,
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            color: '#333',
            mb: 5,
            letterSpacing: 1,
          }}
        >
          AI Traffic Monitoring Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* MapLibre Map */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                height: '75vh',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.01)' },
              }}
            >
              <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  MapLibre Traffic Layer
                </Typography>
                <Typography variant="body2">
                  Lat: {viewState.latitude.toFixed(4)} | Lon: {viewState.longitude.toFixed(4)}
                </Typography>
              </Box>

              <Divider />

              <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_KEY"
                style={{ width: '100%', height: 'calc(100% - 64px)' }}
              />
            </Paper>
          </Grid>

          {/* Google Maps */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={6}
              sx={{
                height: '75vh',
                borderRadius: 4,
                overflow: 'hidden',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.01)' },
              }}
            >
              <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.05)', textAlign: 'center' }}>
                <Typography variant="h6" fontWeight={600}>
                  Google Maps View
                </Typography>
                <Typography variant="body2">Embedded Live Map</Typography>
              </Box>

              <Divider />

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.634722189299!2d76.7769!3d30.7333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0aabc09f91%3A0xfbd8c922d07364e0!2sChandigarh!5e0!3m2!1sen!2sin!4v1689320716505!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
