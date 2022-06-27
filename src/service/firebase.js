import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

  /*
  apiKey: "AIzaSyAdzw9cGN-K6i5XxRuicYVyWLPPhP7dzOc",
  authDomain: "business-card-maker-bb341.firebaseapp.com",
  projectId: "business-card-maker-bb341",
  */
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;

/*
[본 프로젝트는 Firebase ver7사용]
    -> yarn add firebase@7.20.0 
    -> npm install firebase@7.20.0

[firebaseConfig source code] 
    -> go to firebase console
    -> project click
    -> </> project name Icon Click
    -> setting Icon Click

[Etc.]
- apikey, authDomain, projectId는 .env저장하여 사용
- 폴더 내 폴더 추가 시에 한줄로 나오는 것 변경: setting - compact 검색 - Compact Folders 체크해제

[how to use firebase authentication]
1. firebaseConfig 관련정보 입력 (firebase.js)
2. 로그인 및 로그아웃을 담당하는 클래스 컴포넌트 생성 (auth_service.js)
3. UI생성 (login.jsx)
4. AuthService전달 (index.js - app.jsx - login.jsx)
5. firebase의 Autentication에서 사용하고자 하는 매체 able설정
  - https://console.firebase.google.com/u/0/project/business-card-maker-bb341/authentication/providers?hl=ko
  - github OAuth App생성(Id,PW를 받기위해 필요):https://github.com/settings/applications/1937662
6. 생성된 UI에서 AuthService사용 (login.jsx)

*/