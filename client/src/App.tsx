import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useLocation
} from 'react-router-dom'
import Year from './components/Year'
import Month from './components/Month'
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { blueGrey } from '@mui/material/colors'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: blueGrey[900],
      paper: blueGrey[900]
    }
  }
})

function Footer() {
  const location = useLocation()
  return (
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
  )
}

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path='/' element={<Month />} />
            <Route path='/year' element={<Year />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
