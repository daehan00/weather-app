import styles from '../styles/WeeklyWeather.module.css';
import { getWeatherIcon } from '../utils/weatherIcons';

interface Props {
  location: string;
}

function WeeklyWeather({ location }: Props) {
  // 예시 데이터
  const weekly = [
    { day: '월', icon: 'clear', tempH: '25', tempL: 21, rain: 0 },
    { day: '화', icon: 'sunny', tempH: '27', tempL: 21, rain: 0 },
    { day: '수', icon: 'cloudy', tempH: '26', tempL: 21, rain: 0 },
    { day: '목', icon: 'rain', tempH: '22', tempL: 21, rain: 0 },
    { day: '금', icon: 'fog', tempH: '21', tempL: 21, rain: 0 },
    { day: '토', icon: 'windy', tempH: '24', tempL: 21, rain: 0 },
  ];

  return (
    <div className={styles.container}>
      {weekly.map((item, idx) => (
        <div className={styles.row} key={idx}>
          <span className={styles.day}>{item.day}</span>
          <img src={`/src/assets/weather-icons/${getWeatherIcon(item.icon)}.svg`} alt="weather" className={styles.icon} />
          <span className={styles.tempL}>{item.tempL}°</span>
          <span className={styles.tempH}>{item.tempH}°</span>
        </div>
      ))}
    </div>
  );
}

export default WeeklyWeather;
