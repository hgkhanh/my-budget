import React from 'react';

import {Container, Button, BottomNavigation, BottomNavigationAction, Paper, CircularProgress, Box} from "@mui/material";

const LoadingBox = () => (      <Container fixed>
  <Box sx={{
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <CircularProgress/>
  </Box>
</Container>)

export default LoadingBox;
