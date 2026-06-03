# 📱 Stock Signal Mobile

주식 조건 검색 및 추천 서비스를 위한 모바일 애플리케이션입니다.

백엔드에서 분석한 추천 종목(Signal)을 조회하고, 종목 검색 및 관심종목 관리를 할 수 있습니다.

---

# 🧩 프로젝트 소개

Stock Signal은 한국 주식 데이터를 분석하여 조건에 맞는 종목을 추천하는 서비스입니다.

모바일 앱에서는 다음 기능을 제공합니다.

* 추천 Signal 조회
* 종목 검색
* 종목 상세 조회
* 관심종목 관리
* 내 정보 조회

---

# 🛠 기술 스택

## Mobile

* React Native
* Expo SDK 54
* Expo Router
* TypeScript

## State & Storage

* AsyncStorage
* Axios

## Backend

* Spring Boot 3
* JWT Authentication

---

# 📂 프로젝트 구조

```text
app
 ├─ login.tsx
 ├─ stock
 │   └─ [code].tsx
 ├─ signal
 │   └─ [id].tsx
 └─ (tabs)
     ├─ signals.tsx
     ├─ search.tsx
     ├─ favorites.tsx
     └─ my.tsx

src
 ├─ api
 ├─ config
 ├─ storage
 ├─ styles
 └─ types
```

---

# 🔐 인증 기능

## 로그인

* JWT 로그인
* AsyncStorage 저장

## 자동 로그인

앱 시작 시

```text
토큰 존재
↓
추천 Signal 화면 이동

토큰 없음
↓
로그인 화면 이동
```

## 인증 만료 처리

```text
401
403
↓
토큰 삭제
↓
로그인 화면 이동
```

---

# 📈 추천 Signal

## 기능

* 추천 Signal 목록 조회
* Pull To Refresh
* Signal 상세 화면 이동

조회 API

```http
GET /api/signals
```

---

# 🔍 종목 검색

## 기능

* 종목명 검색
* 종목코드 검색

예시

```text
삼성
005930
0013V0
```

조회 API

```http
GET /api/stocks/search?keyword=검색어
```

---

# 📊 종목 상세

## 제공 정보

* 종목명
* 종목코드
* 시장구분
* 현재가
* 등락률
* 거래량
* 거래일
* 수집시간

API

```http
GET /api/stocks/{stockCode}
GET /api/stocks/{stockCode}/price/latest
```

---

# ⭐ 관심종목

## 기능

* 관심종목 추가
* 관심종목 삭제
* 관심종목 목록 조회

API

```http
GET /api/favorites
POST /api/favorites/{stockCode}
DELETE /api/favorites/{stockCode}
```

---

# 👤 내 정보

## 기능

* 이메일 조회
* 닉네임 조회
* 권한 조회
* 로그아웃

API

```http
GET /api/auth/me
```

응답 예시

```json
{
  "email": "test@test.com",
  "nickname": "테스트유저",
  "role": "USER"
}
```

---

# ⚙️ 환경 설정

config.ts

```ts
export const config = {
  API_BASE_URL: "http://YOUR_IP:8080",
};
```

Git 업로드 제외

```gitignore
src/config/config.ts
```

업로드

```text
config.example.ts
```

---

# ✅ 현재 구현 완료

* 로그인
* 자동 로그인
* 로그아웃
* JWT 자동 첨부
* 인증 만료 처리
* 추천 Signal 목록
* Signal 상세
* 종목 검색
* 종목 상세
* 최신 현재가 조회
* 관심종목 관리
* 내 정보 조회
* Pull To Refresh

---

# 🔜 향후 개발 계획

* Firebase FCM Push
* 관심종목 알림
* Signal 알림
* 앱 아이콘 및 스플래시 적용
* 다크모드 지원

---

# 🧑‍💻 개발자

* GitHub: https://github.com/doltank777
* Backend: stock-signal-backend
* Mobile: stock-signal-mobile
