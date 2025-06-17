import { useState } from 'react';
import styles from '../styles/LocationSelector.module.css';

// 예시 데이터
const locations = [
  { id: 1, name: '서울' },
  { id: 2, name: '부산' },
  { id: 3, name: '인천' },
  { id: 4, name: '대구' },
  { id: 5, name: '광주' },
  { id: 6, name: '대전' },
  { id: 7, name: '울산' },
  { id: 8, name: '세종' },
  { id: 9, name: '경기' },
  { id: 10, name: '강원' },
];

interface LocationSelectorProps {
  selectedLocation: string;
  onSelect: (location: string) => void;
}

function LocationSelector({ selectedLocation, onSelect }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLocationSelect = (locationName: string) => {
    onSelect(locationName);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.selectButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        지역 선택
      </button>
      <span className={styles.selectedLocation}>{selectedLocation}</span>
      
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>지역 선택</h3>
              <button 
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.locationList}>
              {locations.map((location) => (
                <button
                  key={location.id}
                  className={styles.locationItem}
                  onClick={() => handleLocationSelect(location.name)}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationSelector; 