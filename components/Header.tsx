import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }} role="header">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            jamesburnside.github.io
          </Typography>
          <Button color="inherit">G</Button>
          <Button color="inherit">L</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}