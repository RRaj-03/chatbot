"use client"
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppTheme from '../../shared-theme/AppTheme';

import AppAppBar from '../components/AppAppBar';
import Search from './components/search';
import Chat from './components/chat';
import { FullScreenPreview } from './components/fullScreenPreview';

export default function Dashboard() {
  return (
    <AppTheme  >
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <AppAppBar/>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% 20%, hsl(165, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% 20%, hsl(165, 100%, 16%), transparent)',
        }),
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              height:'80vh',
              my:"10vh"
            }}
          >
            <Chat/>

          </Stack>
        </Box>
          <Search/>
      </Box>
      <FullScreenPreview/>
    </AppTheme>
  );
}
