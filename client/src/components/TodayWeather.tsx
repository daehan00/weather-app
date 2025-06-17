import React, { useEffect, useState } from 'react';
import styles from '../styles/TodayWeather.module.css';
import { getWeatherIcon } from '../utils/weatherIcons';

// 현재 날씨 데이터
// const currentWeather = {
//   temp: 24,
//   description: '구름 많음',
//   sky: 'cloudy',
//   background: 'cloudy',
//   humidity: 65,
//   windSpeed: 3.5,
//   rain: 1
// };

async function fetchTodayWeather(location: string): Promise<any> {
  const res = await fetch(`http://localhost:4000/api/weather/today?location=${encodeURIComponent(location)}`);
  const data = await res.json();
  console.log(data);
  return data;
}

interface Props {
  location: string;
}

function TodayWeather({ location }: Props) {
  // const hourlyForecast = [
  //   { time: '09:00', icon: 'cloudy', temp: 21, rainP: '10' },
  //   { time: '10:00', icon: 'mostly-cloudy', temp: '24', rainP: '20' },
  //   { time: '11:00', icon: 'partly-cloudy', temp: '26', rainP: '15' },
  //   { time: '12:00', icon: 'sunny', temp: '23', rainP: '30' },
  //   { time: '13:00', icon: 'partly-cloudy', temp: '20', rainP: '50' },
  //   { time: '14:00', icon: 'partly-cloudy', temp: '21', rainP: '10' },
  //   { time: '15:00', icon: 'partly-cloudy', temp: '24', rainP: '20' },
  //   { time: '16:00', icon: 'cloudy', temp: '26', rainP: '15' },
  //   { time: '17:00', icon: 'cloudy', temp: '23', rainP: '30' },
  //   { time: '18:00', icon: 'cloudy', temp: '20', rainP: '50' },
  //   { time: '19:00', icon: 'cloudy', temp: '21', rainP: '10' },
  //   { time: '20:00', icon: 'cloudy', temp: '24', rainP: '20' },
  //   { time: '21:00', icon: 'cloudy', temp: '26', rainP: '15' },
  //   { time: '22:00', icon: 'cloudy', temp: '23', rainP: '30' },
  //   { time: '23:00', icon: 'cloudy', temp: '20', rainP: '50' },
  //   { time: '00:00', icon: 'cloudy', temp: '21', rainP: '10' },
  //   { time: '01:00', icon: 'cloudy', temp: '24', rainP: '20' },
  //   { time: '02:00', icon: 'cloudy', temp: '26', rainP: '15' },
  //   { time: '03:00', icon: 'cloudy', temp: '23', rainP: '30' },
  //   { time: '04:00', icon: 'cloudy', temp: '20', rainP: '50' },
  //   { time: '05:00', icon: 'cloudy', temp: '21', rainP: '10' },
  // ];
  // 상태 선언
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentWeather(null); // location이 바뀌면 기존 데이터 초기화
    setHourlyForecast([]);
    setLoading(true);
    fetchTodayWeather(location).then(data => {
      setCurrentWeather(data.today);
      setHourlyForecast(data.hourly);
      setLoading(false);
    });
  }, [location]);

  // 데이터가 아직 없으면 로딩 표시
  if (loading || !currentWeather)
    return <div className={styles.loadingCenter}>로딩중...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.mainWeather}>
        <img 
          src={`/src/assets/weather-icons/${getWeatherIcon(currentWeather.sky)}.svg`}
          className={styles.iconLarge} 
          alt="현재 날씨" 
        />
        <div className={styles.temperature}>
          {currentWeather.temp === -999 ? '-' : currentWeather.temp}°
        </div>
        <div className={styles.description}>
          {currentWeather.description ?? '-'}
        </div>
        <div className={styles.weatherDetails}>
          <div>습도: {currentWeather.humidity === -999 ? '-' : currentWeather.humidity}%</div>
          <div>풍속: {currentWeather.windSpeed === -999 ? '-' : currentWeather.windSpeed}m/s</div>
          <div>강수량: {currentWeather.rain === -999 ? '-' : currentWeather.rain}mm</div>
        </div>
      </div>
      <div className={styles.backgroundData} data-background={currentWeather.sky} />

      <div className={styles.hourlyWrapper}>
        <div className={styles.labelsColumn}>
            <div className={styles.label}>시간</div>
            <div className={styles.label}>날씨</div>
            <div className={styles.label}>기온</div>
            <div className={styles.label}>강수확률</div>
            <div className={styles.label}>강수량</div>
        </div>

        <div className={styles.dataScrollArea}>
            <div className={styles.dataRows}>
            <div className={styles.row}>
                {hourlyForecast.map((item, idx) => (
                <div className={styles.cell} key={idx}>{item.time ?? '-'}</div>
                ))}
            </div>
            <div className={styles.row}>
                {hourlyForecast.map((item, idx) => (
                <div className={styles.cell} key={idx}>
                    <img 
                      src={`/src/assets/weather-icons/${getWeatherIcon(item.sky)}.svg`}
                      className={styles.hourIcon} 
                      alt="icon" 
                    />
                </div>
                ))}
            </div>
            <div className={styles.row}>
                {hourlyForecast.map((item, idx) => (
                <div className={styles.cell} key={idx}>
                    {item.temp === -999 ? '-' : item.temp}°
                </div>
                ))}
            </div>
            <div className={styles.row}>
                {hourlyForecast.map((item, idx) => (
                <div className={styles.cell} key={idx}>
                    {item.rainP === -999 ? '-' : item.rainP}%
                </div>
                ))}
            </div>
            <div className={styles.row}>
                {hourlyForecast.map((item, idx) => (
                <div className={styles.cell} key={idx}>
                    {item.rainF === -999 ? '-' : item.rainF}mm
                </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default TodayWeather;
