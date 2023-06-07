export const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&autoload=false`;
export const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
  databaseURL: process.env.FIRE_BASE_DATEBASE_URL,
  projectId: process.env.FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.FIRE_BASE_APP_ID,
  measurementId: process.env.FIRE_BASE_MEASUREMENT_ID,
};
