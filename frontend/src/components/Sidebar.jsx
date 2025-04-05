'use client';

import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Monitor', path: '/monitor' },
  { label: 'Traffic Map', path: '/traffic' },
  { label: 'Settings', path: '/settings' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer variant="permanent" anchor="left">
      <List sx={{ width: 220 }}>
        {navItems.map((item) => (
          <Link href={item.path} key={item.path} passHref>
            <ListItemButton selected={pathname === item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
