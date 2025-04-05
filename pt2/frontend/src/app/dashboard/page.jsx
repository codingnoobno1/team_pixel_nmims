'use client';
import { Box, Typography, Container } from '@mui/material';
import MapComponent from '@/components/MapComponent';
import RouteInfo from '@/components/RouteInfo';

const DashboardPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        AI FAST WAY Dashboard
      </Typography>

      <MapComponent />
      <RouteInfo />
    </Container>
  );
};

export default DashboardPage;
