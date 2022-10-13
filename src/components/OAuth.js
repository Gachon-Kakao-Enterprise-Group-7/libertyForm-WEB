const REST_API_KEY = "9769938ebf0f18edb3d2c8b7ab2abb60";
const REDIRECT_URI =  "http://localhost:3000/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;