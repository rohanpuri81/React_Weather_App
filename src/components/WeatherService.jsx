const API_KEY='5081a6815a87035411b7768757a952dc'

const makeIconURL=(iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`

const gerFormattedWeatherData=async(city,units='metric')=>{
   
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5081a6815a87035411b7768757a952dc&units=${units}`

    const data =await fetch(URL)
        .then((res)=>res.json())
        .then((data)=>data)

  const {weather,main:{temp,feels_like,temp_min,temp_max,pressure,humidity},
     wind:{speed},
     sys:{country},
     name
    }=data;

    const {description,icon}=weather[0]

    return {
        description,iconURL:makeIconURL(icon),temp:Math.round(temp),feels_like,temp_max,temp_min,pressure,humidity,speed,country,name
    }


}

export {gerFormattedWeatherData};