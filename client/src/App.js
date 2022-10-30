import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {Year} from './Component/Year/Year';

function App() {
  const [yearData, setYearData] = useState({})

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
      <Year yearData={yearData}/>
    </div>
  );
}

export default App;
