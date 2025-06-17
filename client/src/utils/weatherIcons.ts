export const weatherIconMap: Record<string, string> = {
  // 맑음
  'clear': 'wi-day-sunny',
  'sunny': 'wi-day-sunny',
  
  // 구름
  'cloudy': 'wi-cloudy',
  'partly-cloudy': 'wi-day-cloudy',
  'mostly-cloudy': 'wi-day-cloudy-high',
  
  // 비
  'rain': 'wi-rain',
  'showers': 'wi-showers',
  'heavy-rain': 'wi-rain-wind',
  'thunderstorm': 'wi-thunderstorm',
  
  // 눈
  'snow': 'wi-snow',
  'sleet': 'wi-sleet',
  'hail': 'wi-hail',
  
  // 안개
  'fog': 'wi-fog',
  'mist': 'wi-fog',
  'haze': 'wi-day-haze',
  
  // 바람
  'windy': 'wi-windy',
  'strong-wind': 'wi-strong-wind',
  
  // 기타
  'dust': 'wi-dust',
  'smoke': 'wi-smoke',
  'drizzle': 'wi-sprinkle',
  'light-rain': 'wi-rain-mix',
  'moderate-rain': 'wi-rain',
  'freezing-rain': 'wi-sleet',
  'light-snow': 'wi-snow',
  'moderate-snow': 'wi-snow',
  'heavy-snow': 'wi-snow-wind',
  'ice-pellets': 'wi-hail',
  'light-ice-pellets': 'wi-hail',
  'moderate-ice-pellets': 'wi-hail',
  'heavy-ice-pellets': 'wi-hail',
  'light-sleet': 'wi-sleet',
  'moderate-sleet': 'wi-sleet',
  'heavy-sleet': 'wi-sleet',
  'light-freezing-drizzle': 'wi-sleet',
  'moderate-freezing-drizzle': 'wi-sleet',
  'heavy-freezing-drizzle': 'wi-sleet',
  'light-freezing-rain': 'wi-sleet',
  'moderate-freezing-rain': 'wi-sleet',
  'heavy-freezing-rain': 'wi-sleet',
  'light-rain-showers': 'wi-showers',
  'moderate-rain-showers': 'wi-showers',
  'heavy-rain-showers': 'wi-showers',
  'light-snow-showers': 'wi-snow',
  'moderate-snow-showers': 'wi-snow',
  'heavy-snow-showers': 'wi-snow',
  'light-ice-pellet-showers': 'wi-hail',
  'moderate-ice-pellet-showers': 'wi-hail',
  'heavy-ice-pellet-showers': 'wi-hail',
  'light-sleet-showers': 'wi-sleet',
  'moderate-sleet-showers': 'wi-sleet',
  'heavy-sleet-showers': 'wi-sleet',
  'light-freezing-drizzle-showers': 'wi-sleet',
  'moderate-freezing-drizzle-showers': 'wi-sleet',
  'heavy-freezing-drizzle-showers': 'wi-sleet',
  'light-freezing-rain-showers': 'wi-sleet',
  'moderate-freezing-rain-showers': 'wi-sleet',
  'heavy-freezing-rain-showers': 'wi-sleet',
  'light-rain-thunderstorm': 'wi-thunderstorm',
  'moderate-rain-thunderstorm': 'wi-thunderstorm',
  'heavy-rain-thunderstorm': 'wi-thunderstorm',
  'light-snow-thunderstorm': 'wi-snow-thunderstorm',
  'moderate-snow-thunderstorm': 'wi-snow-thunderstorm',
  'heavy-snow-thunderstorm': 'wi-snow-thunderstorm',
  'light-ice-pellet-thunderstorm': 'wi-thunderstorm',
  'moderate-ice-pellet-thunderstorm': 'wi-thunderstorm',
  'heavy-ice-pellet-thunderstorm': 'wi-thunderstorm',
  'light-sleet-thunderstorm': 'wi-thunderstorm',
  'moderate-sleet-thunderstorm': 'wi-thunderstorm',
  'heavy-sleet-thunderstorm': 'wi-thunderstorm',
  'light-freezing-drizzle-thunderstorm': 'wi-thunderstorm',
  'moderate-freezing-drizzle-thunderstorm': 'wi-thunderstorm',
  'heavy-freezing-drizzle-thunderstorm': 'wi-thunderstorm',
  'light-freezing-rain-thunderstorm': 'wi-thunderstorm',
  'moderate-freezing-rain-thunderstorm': 'wi-thunderstorm',
  'heavy-freezing-rain-thunderstorm': 'wi-thunderstorm',
};

// 기본 아이콘
export const DEFAULT_WEATHER_ICON = 'wi-day-sunny';

// 날씨 상태에 따른 아이콘 가져오기
export const getWeatherIcon = (weatherState: string): string => {
  return weatherIconMap[weatherState] || DEFAULT_WEATHER_ICON;
}; 