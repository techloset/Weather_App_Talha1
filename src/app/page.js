"use client"

import React, { useState } from 'react'
import axios from 'axios'

const page = () => {
const [city, setCity] = useState('')
const [weather, setWeather] = useState({})
const [loader, setLoader] = useState(false)

const url = `https://api.openweathermap.org/data/2.5/weather?q=dubai&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  
const fetchWeather=(e)=>{
  e.preventDefault()
  setLoader(true)

  axios.get(url).then((response) => {
    setWeather(response.data)
    console.log("response.data" ,response.data);
  })
  setCity('')
  setLoader(false)
}

return (
    <div>
      <h1>Weather App</h1>
      <button onClick={fetchWeather} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>Fetch Weather</button>
    </div>
  )
}

export default page