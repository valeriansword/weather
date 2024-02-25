import React, { useState } from "react";
import axios from "axios";
import {Oval} from "react-loader-spinner";
import "./App.css";

function App(){
  const [input,setInput]=useState("");
  const [weather,setWeather]=useState({
    loading:false,
    data:{},
    error:false
  })
  const search=(event)=>{
    if(event.key==="Enter"){
      setInput('')
      setWeather({...weather,loading:true})
      axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params:{
          q:input,
          units:"metric",
          appid:"e5dc2b3d14a1fcc736c7fe7a6e8cdf62"

        }
      }).then(res=>{
        console.log(res)
        setWeather({data:res.data,loading:false,error:false})
      }).catch(err=>{
        setWeather({...weather,data:{},error:true})
      })
    }
  }
  const toDate=()=>{
    const months=[
      "January",	"February",	"March",
"April"	,"May","June",
"July",	"August","September",
"October","November"	,"December"
    ];
    const currentDate=new Date();
    const date=`${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    return date;
  }
  return(
    <div className="App">
      <div className="weatherApp">
        <div className="city-search">
          <input type="text" className="city" placeholder="Enter your city ..."  
           value={input} onChange={(e)=>{setInput(e.target.value)}}
          onKeyDown={search}/>

        </div>
        {
          weather.loading &&(
            <Oval type="oval" height={50} width={50} color="green" ></Oval>
          )
        }
        {
          weather.error &&(
            <div className="errorMessage">
              <span>city was not found</span>
            </div>
          )
        }
        {
          weather && weather.data && weather.data.main &&(
            <div>
               <div className="cityName">
                 <h2>
                      {weather.data.name},
                       <span>{weather.data.sys.country}</span>
                </h2> 
               </div>
              <div className="curDate"> <span>{toDate()}</span></div>
              <div className="weatherImg">
               <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="img"/>
                       {Math.round(weather.data.main.temp)}
                       <sup className="deg">°C</sup>
              </div>
              <div className="des-wind">
                  <p>{weather.data.weather[0].description.toUpperCase()}</p>
                  <p>Wind Speed:{weather.data.wind.speed}</p>

              </div>
            </div>
             

          )
        }
      </div>
      
    </div>
  )
}
export default App