# Weather App

Node.js(Express) + React(TypeScript) 기반의 날씨 정보 웹 애플리케이션

## 개발 환경

- Node.js 18+
- npm 또는 yarn

## 설치 및 실행

### 1. 레포지토리 클론

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. 서버(백엔드) 설치 및 실행

```bash
cd server
npm install
npm run dev   # 또는 npm start
```

### 3. 클라이언트(프론트엔드) 설치 및 실행

```bash
cd ../client
npm install
npm run dev   # 또는 npm start
```

### 4. 접속

- 프론트엔드: http://localhost:3000
- 백엔드(API): http://localhost:4000

## 환경 변수

- `server/.env` : API 키 등 백엔드 환경 변수
- `client/.env` : 프론트엔드 환경 변수 (필요시)

## 주요 기능

- 지역별 실시간/예보 날씨 정보 조회
- 직관적인 UI/UX
- 기상청 OpenAPI 연동
