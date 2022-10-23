import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {Dashboard} from './Component/Dashboard/Dashboard';

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
      asdf
      <Dashboard yearData={yearData}/>
    </div>
  );
}

export default App;
