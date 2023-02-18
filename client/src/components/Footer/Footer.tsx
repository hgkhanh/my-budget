import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import React from 'react'

const Footer = () => {
  const location = useLocation()
  return (
    <>
      <Box sx={{ mb: 8, mt: 8 }} />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels value={location.pathname}>
          <BottomNavigationAction
            component={Link}
            to='/year'
            label='Year'
            value='/year'
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to='/'
            label='Month'
            value='/'
            icon={<FavoriteIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  )
}

export default Footer
