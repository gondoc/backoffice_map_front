const baseUrl = import.meta.env.VITE_API_BASE_URL;
const ctxPath: string = import.meta.env.VITE_MAP_SERVER_CONTEXT_PATH;
export const isDev: boolean = process.env.NODE_ENV === "development"
export const basename = isDev ? "/" : "/back";

export const baseToPath = (path?: string) => {
    if (!path) {
        return {
            pathname: !isDev ? "/" : basename
        }
    }
    return isDev ? basename.concat("/").concat(path) : "/".concat(path);
}

export const URL = {

    MAP: {
        REG: `${baseUrl}/${ctxPath}/api/hist/item`,
        MOD: `${baseUrl}/${ctxPath}/api/hist/item`,
        DEL: `${baseUrl}/${ctxPath}/api/hist/item/{id}`,
        LIST: `${baseUrl}/${ctxPath}/api/hist/items`,
        YEAR: `${baseUrl}/${ctxPath}/api/hist/year-items`,
    },
    LOCATION: {
        REG: `${baseUrl}/${ctxPath}/api/site/item`,
        MOD: `${baseUrl}/${ctxPath}/api/site/item`,
        DEL: `${baseUrl}/${ctxPath}/api/site/item/{id}`,
        LIST: `${baseUrl}/${ctxPath}/api/site/items`,
        STAT: `${baseUrl}/${ctxPath}/api/site/stat`
    },
    CATEGORY: {
        REG: `${baseUrl}/${ctxPath}/api/category/item`,
        MOD: `${baseUrl}/${ctxPath}/api/category/item`,
        DEL: `${baseUrl}/${ctxPath}/api/category/item/{id}`,
        LIST: `${baseUrl}/${ctxPath}/api/category/items`,
        STAT: `${baseUrl}/${ctxPath}/api/category/stat`
    },
    AUTH: {
        ME: `${baseUrl}/${ctxPath}/api/auth/me`,
        LOGIN: `${baseUrl}/${ctxPath}/api/auth/login`,
        REFRESH: `${baseUrl}/${ctxPath}/api/auth/refresh`,
        LOGOUT: `${baseUrl}/${ctxPath}/api/auth/logout`,
        FIND_PW: `${baseUrl}/${ctxPath}/api/auth/forgotPw`,
        RESET_PW: `${baseUrl}/${ctxPath}/api/auth/resetPw`,
        CHANGE_PW:`${baseUrl}/${ctxPath}/api/auth/change-password`,
    },
    USER: {
        INFO: `${baseUrl}/${ctxPath}/api/user/signUp`,
        ID_CHECK: `${baseUrl}/${ctxPath}/api/user/checkId/{id}`,
        NICK_CHECK: `${baseUrl}/${ctxPath}/api/user/checkNick/{nick}`,
        SEND_CODE: `${baseUrl}/${ctxPath}/api/user/reqCd`,
        VERIFY_CODE: `${baseUrl}/${ctxPath}/api/user/verifyCd`,
        NICK: `${baseUrl}/${ctxPath}/api/user/nick`,
        FIND_ID: `${baseUrl}/${ctxPath}/api/user/findId`,
        RCVRY_EMAIL: `${baseUrl}/${ctxPath}/api/user/recovery-mail`,
        VERIFY_EMAIL: `${baseUrl}/${ctxPath}/api/user/verify-mail`,
    },

    IMAGE: (id: string, fileNm: string) => `${baseUrl}/${ctxPath}/images/`.concat(id.concat("|").concat(fileNm)),
}

export default URL
