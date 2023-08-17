import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Chart1 from "../../components/charts/Chart1/Chart1";
import axios from 'axios';
import { useEffect,useState } from "react";


const Home = () => {

  const [chartData,setChartData] = useState([]);
  const [flag,setFlag] = useState(0);
  const dataMap = new Map();
  const freqMap = new Map();

  useEffect(()=>{
    const dataFetcher = async() => {
      await new Promise((resolve,reject) => {
        axios.post(`http://localhost:3001/`).then(rs=>{

        rs.data.data.forEach(e=>{

          if(dataMap.get(e.region)){

            dataMap.set(e.region,dataMap.get(e.region) + (e.likelihood)*1);
            freqMap.set(e.region,freqMap.get(e.region) + 1);
          }else{
            dataMap.set(e.region,(e.likelihood)*1);
            freqMap.set(e.region,1);
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
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          {flag &&<Chart1 title="Region Livelihood (use Dar mode and hover)" aspect={2 / 1} data={chartData} />}
        </div>
      </div>
    </div>
  );
};

export default Home;