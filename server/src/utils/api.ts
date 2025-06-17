import axios from 'axios';
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

interface ApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: any[];
      };
    };
  };
}

interface Location {
  x: number;
  y: number;
}

// 위치 정보 매핑 (예시 데이터)
const locationMap: Record<string, Location> = {
  '서울': { x: 60, y: 127 },
  '인천': { x: 55, y: 124 },
  '부산': { x: 98, y: 76 },
  '대구': { x: 89, y: 90 },
  '광주': { x: 58, y: 74 },
  '대전': { x: 67, y: 100 },
  '울산': { x: 102, y: 84 },
  '세종': { x: 66, y: 103 },
  '경기': { x: 60, y: 120 },
  '강원': { x: 73, y: 134 },
  '충북': { x: 69, y: 107 },
  '충남': { x: 68, y: 100 },
  '전북': { x: 63, y: 89 },
  '전남': { x: 51, y: 67 },
  '경북': { x: 89, y: 91 },
  '경남': { x: 91, y: 77 },
  '제주': { x: 52, y: 38 }
};

async function getLocation(location: string): Promise<Location> {
  const coordinates = locationMap[location];
  if (!coordinates) {
    throw new Error(`위치 정보를 찾을 수 없습니다: ${location}`);
  }
  return coordinates;
}

function getBaseDateTime(type: string, now: Date = new Date()): { date: string, time: string } {
  // 날짜 형식: YYYYMMDD
  let date = now.toISOString().slice(0, 10).replace(/-/g, '');

  if (type === 'getUltraSrtNcst' || type === 'getUltraSrtFcst') {
    // 1시간 단위, 10분마다 갱신, base_time은 현재시각 기준 가장 최근 정시
    let hour = now.getHours();
    let minute = now.getMinutes();
    if (minute < 40) hour -= 1; // 40분 이전이면 이전 시각 사용
    if (hour < 0) {
      // 자정 이전이면 전날 23시
      hour = 23;
      const prev = new Date(now);
      prev.setDate(now.getDate() - 1);
      date = prev.toISOString().slice(0, 10).replace(/-/g, '');
    }
    const time = hour.toString().padStart(2, '0') + '00';
    return { date, time };
  }

  if (type === 'getVilageFcst') {
    // 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 중 가장 최근 값
    const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
    let hour = now.getHours();
    let minute = now.getMinutes();

    // 30분 이전이면 이전 base_time 사용
    if (minute < 45) hour -= 1;
    if (hour < 0) {
      hour = 23;
      const prev = new Date(now);
      prev.setDate(now.getDate() - 1);
      date = prev.toISOString().slice(0, 10).replace(/-/g, '');
    }

    // 가장 가까운 base_time 찾기
    let baseHour = baseTimes[0];
    for (let i = 0; i < baseTimes.length; i++) {
      if (hour >= baseTimes[i]) baseHour = baseTimes[i];
    }
    const time = baseHour.toString().padStart(2, '0') + '00';
    return { date, time };
  }

  // 기본값: 현재 날짜, 0000시
  return { date, time: '0000' };
}

async function makeUrl(type: string, location: string): Promise<string> {
  const base_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/" + type;
  const nxy = await getLocation(location);
  
  let { date, time } = getBaseDateTime(type);
  
  const params = new URLSearchParams({
    serviceKey: process.env.OPENAPI_KEY || '',
    numOfRows: '1000',
    pageNo: '1',
    base_date: date,
    base_time: time,
    nx: nxy.x.toString(),
    ny: nxy.y.toString(),
    dataType: 'JSON'
  });

  return `${base_url}?${params.toString()}`;
}

async function queryDataFromAPI(type: string, location: string): Promise<any[]> {
  try {
    const url = await makeUrl(type, location);
    const response = await axios.get<ApiResponse>(url);
    console.log(response.data.response.body);
    const { response: { header, body } } = response.data;

    // 응답 코드 확인
    if (header.resultCode !== '00') {
      throw new Error(`API Error: ${header.resultMsg}`);
    }

    // items.item 배열 반환
    return body.items.item;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API 요청 중 오류 발생:', error.message);
    } else {
      console.error('알 수 없는 오류 발생');
    }
    throw error;
  }
}

// 초단기 실황 데이터 필터링
export async function getUltraSrtNcst(location: string) {
  const data = await queryDataFromAPI('getUltraSrtNcst', location);
  return data.reduce((acc: Record<string, any>, item: any) => {
    acc[item.category] = {
      value: item.obsrValue,
      time: item.baseTime
    };
    return acc;
  }, {});
}

// 초단기 예보 데이터 필터링
export async function getUltraSrtFcst(location: string) {
  const data = await queryDataFromAPI('getUltraSrtFcst', location);
  const now = new Date();
  const nowHHMM = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');

  const forecastByTime = data.reduce((acc: Record<string, any>, item: any) => {
    const time = item.fcstTime;
    if (!acc[time]) {
      acc[time] = {};
    }
    acc[time][item.category] = item.fcstValue;
    return acc;
  }, {});

  // 현재 시각 이후 데이터만 반환
  return Object.entries(forecastByTime)
    .filter(([time]) => time > nowHHMM)
    .slice(0,1)
    .map(([time, values]) => ({
      time,
      ...values
    }));
}

// 단기 예보 데이터 필터링
export async function getVilageFcst(location: string) {
  const data = await queryDataFromAPI('getVilageFcst', location);
  const now = new Date();
  const nowHHMM = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');

  const forecastByTime = data.reduce((acc: Record<string, any>, item: any) => {
    const time = item.fcstTime;
    if (!acc[time]) {
      acc[time] = {};
    }
    acc[time][item.category] = item.fcstValue;
    return acc;
  }, {});

  // 현재 시각 이후 데이터만 필터링 후 반환
  return Object.entries(forecastByTime)
    .filter(([time]) => time > nowHHMM)
    .map(([time, values]) => ({
      time,
      ...values
    }));
}
