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
import LoadingBox from "../LoadingBox";

const Year = () => {
  const [date, setDate] = useState(moment().set({'date': 1}).subtract(1, 'month'));
  const [yearData, setYearData] = useState<YearAPIResponse>();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/year/${date.year()}`).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data => setYearData(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, []);

  if (isError) {
    return (
      <Error/>
    )
  }

  return (
    <Container fixed>
      <h1>2022</h1>
      {
        isLoading || !yearData ? (<LoadingBox/>) :
          (
            <>
              <Overview data={yearData.year}/>
              <MonthlyBarChart yearData={yearData}/>
              <CategoryInfo isYearInfo={true} categories={yearData.categories}/>
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
            </>
          )
      }
    </Container>
  )

}

export default Year;
