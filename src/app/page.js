"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

const page = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  // const [loader, setLoader] = useState(false);

  // console.log(city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    // setLoader(true);

    axios.get(url).then((response) => {
      setWeather(response.data);
      console.log(response.data);
    });
    setCity("");
    // setLoader(false);
  };

  return (
    <div>
      <h1>Weather App</h1>

      <input
        type="text"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search City"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        onClick={fetchWeather}
        className="bg-white mt-2 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Fetch Weather
      </button>

      {weather.weather && (
        <div>
          <p>{weather.weather[0].main}</p>
          <Image
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="iamge"
            width="100"
            height="100"
          />
          <p> Weather in {weather.name}</p>
          <p> Temperature: {weather.main.temp.toFixed(0)}&#176;</p>
          <p> Feels Like: {weather.main.feels_like} </p>
          <p> Humidity: {weather.main.humidity} </p>
          <p> Wind Speed: {weather.wind.speed.toFixed(0)} </p>
        </div>
      )}
    </div>
  );
};

export default page;
