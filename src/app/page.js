"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";


const page = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loader, setLoader] = useState(false);

  // console.log(city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city }&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoader(true);

    axios.get(url).then((response) => {
      setWeather(response.data);
      console.log( response.data);
    });
    setCity("");
    setLoader(false);
  };

  return (
    <div>
      <h1>Weather App</h1>

      <input
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search City"
        required
        onChange={(e)=> setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="bg-white mt-2 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Fetch Weather
      </button>

      {weather.weather && (
        <p>{weather.weather[0].main}</p>
      )}
    </div>
  );
};

export default page;
