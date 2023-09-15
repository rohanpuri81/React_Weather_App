import { useEffect, useState } from 'react'
import Descriptions from './components/Descriptions';
import { gerFormattedWeatherData } from './components/WeatherService';

function App() {

  
  const hot= './hot.jpg';
  const cold= './cold.jpg';
  const [bg,setBg]=useState(hot)
  const [weather,setWeather]=useState(null)
  const [units,setUnits]= useState('metric')
  const [city,setCity]= useState('seattle')
  
  useEffect(()=>{
    const weatherData= async()=>{
      const data = await gerFormattedWeatherData(city,units) 
      setWeather(data)

       const threashHold = units ==='metric'?20:60
       if(data.temp<threashHold){
        setBg(cold)
       }else{
        setBg(hot)
       }
    }
    weatherData()
  },[city,units])

  const handleUnitsClick=(e)=>{
     const button = e.currentTarget;
     const currentUnit = button.innerText.slice(1)
     const isCelcius = currentUnit =="C"
     button.innerText = isCelcius?`${button.innerText.slice(0,1)}F`:`${button.innerText.slice(0,1)}C`
     setUnits(isCelcius?"metric":"imperial")
  }

  return (
    <div className='app' style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {
          weather && (

        <div className="container">
          <div className="sectionInputs">
            <input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} name='city' placeholder='Enter city..'/>
            <button onClick={(e)=>handleUnitsClick(e)}>&deg;F</button>
          </div>

          <div className="sectionTemprature">
            <div className="description">
              <h3>{`${weather.name} ${weather.country}`}</h3>
              <img src={weather.iconURL} />
              <h3>{weather.description}</h3>
            </div>

            <div className="temprature">
              <h1>{`${weather.temp}`} &deg;{`${units=='metric'?"C":"F"}`}</h1>
            </div>
          </div>

          {/* Extra Information */}
          <Descriptions weather={weather} units={units}/>


         </div>
          )
        }
      </div>
    </div>
  )
}

export default App
