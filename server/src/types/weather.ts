// server/src/types/weather.ts
export interface CurrentWeather {
    temp: number;
    description: string;
    sky: string;
    humidity: number;
    windSpeed: number;
    rain: number;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  sky: string;
  rainP: number;
  rainF: number;
}

export interface DailyWeather {
  day: string;
  sky: string;
  tempH: number;
  tempL: number;
  rain: number;
}

export interface WeeklyForecast {
  weekly: DailyWeather[];
}

export interface HourlyForecast {
  today: CurrentWeather;
  hourly: HourlyWeather[];
}
