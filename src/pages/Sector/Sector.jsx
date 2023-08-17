import './sector.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart2 from "../../components/charts/Chart2/Chart2";
import axios from 'axios';
import { useEffect,useState } from "react";

const Sector = () => {
  const [chartData,setChartData] = useState([]);
  const [flag,setFlag] = useState(0);
  const dataMap = new Map();
  const freqMap = new Map();

  useEffect(()=>{
    const dataFetcher = async() => {
      await new Promise((resolve,reject) => {
        axios.post(`http://localhost:3001/`).then(rs=>{

        rs.data.data.forEach(e=>{

          if(dataMap.get(e.sector)){

            dataMap.set(e.sector,dataMap.get(e.sector) + (e.intensity)*1);
            freqMap.set(e.sector,freqMap.get(e.sector) + 1);
          }else{
            dataMap.set(e.sector,(e.intensity)*1);
            freqMap.set(e.sector,1);
          }
          
        })
        resolve(rs)
      })
        
      })
      

      await new Promise((resolve,reject) => {

        freqMap.forEach((value, key) => {
          dataMap.set(key , dataMap.get(key)/value);
        })
        resolve(dataMap)
      }).then(rs=>{
        console.log(rs,' -> rs data map')
      })

      await new Promise((resolve,reject) => {
        dataMap.forEach((value, key) => {
          setChartData(prev=> {
            return [...prev,{label:key,value:value}]
          })
        })
        resolve(chartData)
      }).then(rs=>{
        setFlag(1);
      })
    }
    dataFetcher();
    // eslint-disable-next-line
  },[])
  

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="charts">
          {flag &&<Chart2 title="Sector wise Intensity(use Dark Mode and hover)"  data={chartData} />}
        </div>
      </div>
    </div>
  );
}

export default Sector