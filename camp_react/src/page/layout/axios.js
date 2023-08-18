import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // 스프링 서버 URL
    withCredentials: true, // CORS 관련 설정
});

export default instance;