import { useState } from 'react';
import TodayWeather from './TodayWeather';
import WeeklyWeather from './WeeklyWeather';
import LocationSelector from './LocationSelector';

import styles from '../styles/WeatherContainer.module.css';

function WeatherContainer() {
  const [selectedLocation, setSelectedLocation] = useState('서울');

  return (
    <div className={styles.weatherBox}>
      <LocationSelector
        selectedLocation={selectedLocation}
        onSelect={setSelectedLocation}
      />
      <div className={styles.weatherLeft}>
        <TodayWeather location={selectedLocation} />
      </div>
      <div className={styles.weatherRight}>
        <WeeklyWeather location={selectedLocation} />
      </div>
    </div>
  );
}

export default WeatherContainer;