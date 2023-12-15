import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherAction = createAsyncThunk(
  "fetchWeather",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${payload}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
        if (!error?.responce) {
            throw error
        }
        return rejectWithValue(error?.responce?.data)
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(getQuizs.fulfilled, (state, action) => {
        let newState: any = {
          ...state,
          quizs: action.payload,
        };
        return newState;
      });
  
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
        state.weather = action?.payload;
        state.loading = false;
    });
    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
        state.loading = false;
        // console.log('error');
        state.error = action?.payload;
    });
  },
});

export default weatherSlice.reducer