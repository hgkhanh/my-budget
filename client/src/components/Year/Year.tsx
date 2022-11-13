import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Container, Paper, BottomNavigation, BottomNavigationAction, Box, CircularProgress} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {YearAPIResponse} from "types";
import MonthlyBarChart from "components/Year/components/MonthlyBarChart";
import Overview from "../Overview";
import CategoryInfo from "../CategoryInfo";
import {Link, useLocation} from "react-router-dom";
import Error from "../Error";

const Year = () => {
  const [date, setDate] = useState(moment().set({'date': 1}).subtract(1, 'month'));
  const [yearData, setYearData] = useState<YearAPIResponse>();
  const [isLoading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetch(`/api/year/${date.year()}`).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data => setYearData(data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, []);

  if (isLoading) {
    return (
      <Container fixed>
        <Box sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CircularProgress/>
        </Box>
      </Container>
    )
  }

  if (yearData && yearData.year) {
    return (
      <Container fixed>
        <h1>2022</h1>
        <Overview data={yearData.year}/>
        <MonthlyBarChart yearData={yearData}/>
        <CategoryInfo categories={yearData.year.categories}/>
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
          <BottomNavigation
            showLabels value={location.pathname}>
            <BottomNavigationAction
              component={Link}
              to="/year"
              label="Year"
              value="/year"
              icon={<RestoreIcon/>}
            />
            <BottomNavigationAction
              component={Link}
              to="/"
              label="Month"
              value="/"
              icon={<FavoriteIcon/>}
            />
          </BottomNavigation>
        </Paper>
      </Container>
    )
  }
  return (
    <Error/>
  )
}

export default Year;
