import './endyear.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart3 from "../../components/charts/Chart3/Chart3";
import axios from 'axios';
import { useEffect,useState } from "react";

const EndYear = () => {
  const [chartData,setChartData] = useState([]);
  const [flag,setFlag] = useState(0);
  const dataMap = new Map();
  const freqMap = new Map();

  useEffect(()=>{
    const dataFetcher = async() => {
      await new Promise((resolve,reject) => {
        axios.post(`http://localhost:3001/`).then(rs=>{

        rs.data.data.forEach(e=>{

          if(dataMap.get(e.end_year)){

            dataMap.set(e.end_year,dataMap.get(e.end_year) + (e.impact)*1);
            freqMap.set(e.end_year,freqMap.get(e.end_year) + 1);
          }else{
            dataMap.set(e.end_year,(e.impact)*1);
            freqMap.set(e.end_year,1);
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
          {flag &&<Chart3 title="Year_End Impact(use Dark Mode and hover)"  data={chartData} />}
        </div>
      </div>
    </div>
  );
}

export default EndYear;