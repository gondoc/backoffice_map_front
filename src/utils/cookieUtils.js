// cookieUtils.js
export const cookieUtils = {
    // 쿠키 값 가져오기
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    },

    // 쿠키 설정
    setCookie(name, value, days = 1) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    },

    // 쿠키 삭제
    deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },

    // 인증 상태 체크
    isGuest() {
        return this.getCookie('role') === 'VIEWER';
    },

    hasAccessToken() {
        return !!this.getCookie('access_token');
    },

    isAuthenticated() {
        return !this.isGuest() && this.hasAccessToken();
    },

    // 비회원 모드로 전환
    switchToGuestMode() {
        this.deleteCookie('access_token');
        this.deleteCookie('refresh_token');
        this.setCookie('role', 'VIEWER', 1);
    }
};