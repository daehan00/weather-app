// server/src/services/weatherService.ts
import { PassThrough } from 'stream';
import { CurrentWeather, HourlyWeather, HourlyForecast } from '../types/weather';
import { getUltraSrtNcst, getUltraSrtFcst, getVilageFcst } from '../utils/api';

export class WeatherService {
  // 현재 날씨 데이터 가져오기
  async getTodayWeather(location: string): Promise<HourlyForecast> {
    const today = await this.getCurrentWeather(location);
    const hourly = await this.getLongTermForecast(location);
    return { today: today, hourly: hourly }
  }


  async getCurrentWeather(location: string): Promise<CurrentWeather> {
    const data = await getUltraSrtNcst(location);
    const data1 = await this.getShortTermForecast(location);
    
    // 데이터가 없는 경우 기본값 설정
    const defaultData = {
      temp: -999,
      description: "",
      sky: data1[0].sky,
      humidity: -999,
      windSpeed: -999,
      rain: -999,
    };

    // 데이터가 없는 경우 기본값 반환
    if (!data || Object.keys(data).length === 0) {
      return defaultData;
    }

    // 각 카테고리별 데이터 처리
    const result = {
      temp: data.T1H?.value !== '-999' ? parseFloat(data.T1H.value) : defaultData.temp,
      description: defaultData.description,
      humidity: data.REH?.value !== '-998' ? parseFloat(data.REH.value) : defaultData.humidity,
      sky: defaultData.sky,
      windSpeed: data.WSD?.value !== '-998.9' ? parseFloat(data.WSD.value) : defaultData.windSpeed,
      rain: data.PTY?.value !== '-999' ? parseInt(data.PTY.value) : defaultData.rain
    };

    return result;
  }

  // 초단기 예보 데이터 가져오기 (6시간)
  async getShortTermForecast(location: string): Promise<HourlyWeather[]> {
    const data = await getUltraSrtFcst(location);
    
    return data.map(item => ({
      time: item.time,
      temp: parseFloat(item.T1H),
      sky: this.getWeatherIcon(parseInt(item.SKY), parseInt(item.PTY)),
      rainP: parseInt(item.RN1),
      rainF: parseInt(item.PTY)
    }));
  }

  // 단기 예보 데이터 가져오기 (24시간)
  async getLongTermForecast(location: string): Promise<HourlyWeather[]> {
    const data = await getVilageFcst(location);
    
    return data.map(item => ({
      time: item.time,
      temp: parseFloat(item.TMP),
      sky: this.getWeatherIcon(parseInt(item.SKY), parseInt(item.PTY)),
      rainP: parseInt(item.POP),
      rainF: parseInt(item.PTY)
    }));
  }

  // 날씨 상태에 따른 아이콘 매핑
  getWeatherIcon(sky: number, precipitationType: number): string {
    if (precipitationType > 1) {
      switch (precipitationType) {
        case 2: return 'rain-snow';
        case 3: return 'snow';
        case 4: return 'shower';
        default: return 'rain';
      }
    }

    switch (sky) {
      case 1: return 'clear';
      case 2: return 'partly-cloudy';
      case 3: return 'mostly-cloudy';
      case 4: return 'cloudy';
      default: return 'clear';
    }
  }
}