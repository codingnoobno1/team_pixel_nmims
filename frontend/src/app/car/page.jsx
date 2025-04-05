'use client';

import { Box, Typography, Paper, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const frameWidth = isMobile ? 320 : 800;
  const frameHeight = isMobile ? 240 : 600;

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f0f0f0"
      padding={2}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        YOLOv8 Live Vehicle Detection
      </Typography>

      <Paper
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          width: frameWidth,
          height: frameHeight,
          maxWidth: '100%',
        }}
      >
        <iframe
          src="http://localhost:4000/video_feed"
          width="100%"
          height="100%"
          title="YOLOv8 Stream"
          allow="fullscreen"
          style={{ border: 'none' }}
        />
      </Paper>
    </Box>
  );
}
