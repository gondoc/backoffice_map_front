import axios from "axios";
import {cookieUtils} from "@utils/cookieUtils";
import Url from "@config/url";

// 기본 설정 - 쿠키 자동 전송
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키 자동 전송

// 응답 인터셉터
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log(" originalRequest, ", originalRequest);

        if (error.response?.data) {
            const errorResponse = error.response.data;

            // 인증 필요 에러
            if (errorResponse?.data === 'AUTH_REQUIRED') {
                if (cookieUtils.isGuest()) {
                    alert('로그인이 필요한 서비스입니다.');
                    // 로그인 모달 표시 또는 로그인 페이지로 이동
                    return Promise.reject(error);
                }
            }

            // JWT 만료 에러 (회원만 해당)
            if (errorResponse?.code === 401 &&
                errorResponse?.data === 'JWT_EXPIRED' &&
                !originalRequest._retry &&
                !cookieUtils.isGuest()) {

                // refresh 요청 자체는 재시도하지 않음
                if (originalRequest.url?.includes('/auth/refresh')) {
                    cookieUtils.switchToGuestMode();
                    window.location.reload();
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                try {
                    console.log('refresh token request...');

                    // 새로운 인스턴스로 refresh 요청 (쿠키는 자동 전송됨)
                    const refreshAxios = axios.create({
                        baseURL: import.meta.env.VITE_API_BASE_URL,
                        withCredentials: true,
                        timeout: 10000
                    });

                    const refreshResponse = await refreshAxios.post(Url.AUTH.REFRESH);

                    if (refreshResponse.status === 200) {
                        console.log('Token refresh success!');
                        // processQueue(); // 큐에 있는 요청들 처리
                        return axios(originalRequest);
                    }

                } catch (refreshError) {
                    console.error('Token refresh failed, switching to guest mode');
                    cookieUtils.switchToGuestMode();

                    // 현재 페이지에서 비회원으로 계속 이용
                    window.location.reload();
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export default axios;