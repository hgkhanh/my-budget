import React, {useEffect, useState} from 'react';
import './App.css';
import {Year} from "./components/Year/Year";
import {YearAPIResponse} from "./types";

function App() {
  const [yearData, setYearData] = useState<YearAPIResponse>();

  useEffect(() => {
    fetch("/api/year").then(response => {
      if(response.status === 200){
        return response.json()
      }
    }).then(data => setYearData(data))
      .catch(error => console.log(error))
  },[])

  return (
    <div className="App">
      {yearData && <Year yearData={yearData}/>}
    </div>
  );
}

export default App;
