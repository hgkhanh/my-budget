import React, {useEffect, useState} from 'react';

import {Container, Button} from "@mui/material";
import {PeriodOverview} from "types";
import moment from "moment";
import Overview from "./components/Overview/Overview";
import CategoryInfo from "./components/CategoryInfo/CategoryInfo";

const Month = () => {
  const [data, setData] = useState<PeriodOverview>();
  const [date, setDate] = useState(moment().set({'date': 1}).subtract(1, 'month'));

  useEffect(() => {
    if (date) {
      fetch(`/api/month/${date.format('YYYY-MM-DD')}`).then(response => {
        if (response.status === 200) {
          return response.json()
        }
      }).then(data => setData(data))
        .catch(error => console.log(error))
    }
  }, [date])


  return (
    <Container fixed>
      <h1>{date.format('MMM')} {date.year()}</h1>
      <Button onClick={() => setDate(date.clone().subtract(1, 'month'))}>Prev</Button>
      <Button onClick={() => setDate(date.clone().add(1, 'month'))}>Next</Button>

      {
        data &&
        (
          <>
            <Overview data={data}/>
            <CategoryInfo categories={data.categories}/>
          </>
        )
      }
    </Container>
  )

}

export default Month;
