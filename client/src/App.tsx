import { useState, useEffect } from 'react';
import './App.css';
import WeatherContainer from './components/WeatherContainer';

// 배경 이미지 타입 정의
type BackgroundImage = {
  default: string;
};

// 배경 이미지들을 한 번에 import
const backgroundImages: Record<string, BackgroundImage> = import.meta.glob('./assets/bg_img/*.jpg', { eager: true });

// 날씨 아이콘들을 한 번에 import
const weatherIcons: Record<string, BackgroundImage> = import.meta.glob('./assets/weather-icons/*.png', { eager: true });

function App() {
  const [background, setBackground] = useState(backgroundImages['./assets/bg_img/sunny.jpg'].default);

  useEffect(() => {
    const backgroundData = document.querySelector('[data-background]');
    if (backgroundData) {
      const bgType = backgroundData.getAttribute('data-background');
      const imagePath = `./assets/bg_img/${bgType}.jpg`;
      
      if (backgroundImages[imagePath]) {
        setBackground(backgroundImages[imagePath].default);
      } else {
        // 기본 이미지로 폴백
        setBackground(backgroundImages['./assets/bg_img/sunny.jpg'].default);
      }
    }
  }, []);

  return (
    <>
      <div 
        className="appBackground"
        style={{ backgroundImage: `url(${background})` }}
      >
        <WeatherContainer />
      </div>
    </>
  );
}

export default App
