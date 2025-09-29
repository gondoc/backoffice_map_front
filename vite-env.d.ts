interface ImportMetaEnv {
    readonly VITE_REACT_APP_KAKAO_JS_KEY: string;
    readonly VITE_MAP_SERVER_CONTEXT_PATH: string;
    readonly VITE_MAP_SERVER_PORT: number;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_MAP_FRONT_PORT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}