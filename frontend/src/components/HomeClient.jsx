'use client';
import { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import MonitorTab from './MonitorTab';

export default function HomeClient() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Sidebar />
      <Box sx={{ ml: '260px', p: 4 }}>
        <Typography variant="h4" mb={2}>🚦 Traffic Monitoring System</Typography>

        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Route 1" />
          <Tab label="Route 2" />
          <Tab label="Route 3" />
        </Tabs>

        <Box mt={4}>
          {tab === 0 && <MonitorTab id="TL1" />}
          {tab === 1 && <MonitorTab id="TL2" />}
          {tab === 2 && <MonitorTab id="TL3" />}
        </Box>
      </Box>
    </>
  );
}
