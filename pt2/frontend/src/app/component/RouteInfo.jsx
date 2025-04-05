'use client';
import { Box, Card, CardContent, Typography } from '@mui/material';

const RouteInfo = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Typography variant="h6">Route 1</Typography>
          <Typography variant="body2">
            Distance: 15 km<br />
            Traffic: Moderate<br />
            Estimated Time: 22 mins
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Typography variant="h6">Route 2</Typography>
          <Typography variant="body2">
            Distance: 12 km<br />
            Traffic: Heavy<br />
            Estimated Time: 27 mins
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RouteInfo;
