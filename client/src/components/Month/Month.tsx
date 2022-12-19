import React, {useEffect, useState} from 'react';

import {Container, Button, BottomNavigation, BottomNavigationAction, Paper, CircularProgress, Box} from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {PeriodOverview} from "types";
import moment from "moment";
import Overview from "../Overview/Overview";
import CategoryInfo from "../CategoryInfo/CategoryInfo";
import {Link, useLocation} from "react-router-dom";
import LoadingBox from "../LoadingBox";

const Month = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<PeriodOverview>();
  const [date, setDate] = useState(moment().set({'date': 1}).subtract(1, 'month'));
  const location = useLocation();

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetch(`/api/month/${date.format('YYYY-MM-DD')}`).then(response => {
        if (response.status === 200) {
          return response.json()
        }
      }).then(data => setData(data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
  }, [date])


  return (
    <Container fixed>
      <h1>{date.format('MMM')} {date.year()}</h1>
      <Button onClick={() => setDate(date.clone().subtract(1, 'month'))}>Prev</Button>
      <Button onClick={() => setDate(date.clone().add(1, 'month'))}>Next</Button>

      {
        isLoading || !data ? (<LoadingBox/>) :
        (
          <>
            <Overview data={data}/>
            <CategoryInfo categories={data.categories}/>
          </>
        )
      }

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

export default Month;
