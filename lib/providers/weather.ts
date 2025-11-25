import axios from "axios";

/**
 * Weather Provider (Open-Meteo)
 * Free, fast, no API keys required.
 * Works perfectly for Alaska ports & marine conditions.
 */

export async function fetchWeather(lat: number, lon: number) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,wind_speed_10m,wind_gusts_10m,cloudcover&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=UTC&forecast_days=3&cell_selection=sea`;

    const { data } = await axios.get(url);
    return {
      ok: true,
      raw: data,
      current: {
        tempF: Math.round((data.hourly.temperature_2m[0] * 9) / 5 + 32),
        windMph: Math.round(data.hourly.wind_speed_10m[0] * 0.621371),
        gustMph: Math.round(data.hourly.wind_gusts_10m[0] * 0.621371),
        precipitation: data.hourly.precipitation[0],
        cloudCover: data.hourly.cloudcover[0],
      },
      forecast: data.daily,
    };
  } catch (error) {
    console.error("Weather provider failed:", error);
    return {
      ok: false,
      current: null,
      forecast: null,
    };
  }
}
