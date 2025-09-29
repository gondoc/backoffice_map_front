import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    const DOMAIN: string = env.VITE_SERVER_DOMAIN;

    return {
        // vite config
        // define: {
        //     // APP_HOME: JSON.stringify(env.APP_ENV),
        //     // REACT_APP_KAKAO_JS_KEY: JSON.stringify(env.APP_ENV),
        //     // MAP_SERVER_CONTEXT_PATH: JSON.stringify(env.APP_ENV),
        //     // MAP_SERVER_PORT: JSON.stringify(env.APP_ENV),
        //     // API_BASE_URL: JSON.stringify(env.APP_ENV),
        // },
        base: '/back/',
        server: {
            allowedHosts: [DOMAIN],
            cors: {
                credentials: true
            },
        },
        plugins: [
            react(), tsconfigPaths(),
            removeConsole({includes: ["log", "warn", "error", "info", "debug"]})
        ],
        esbuild: {
            drop: process.env.NODE_ENV !== "development" ? ['console', 'debugger'] : [], // console.*, debugger 제거
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: [
                // {find: "@", replacement: path.resolve(__dirname, 'src')},
                {find: "@css", replacement: path.resolve(__dirname, 'src/assets/css')},
                {find: "@image", replacement: path.resolve(__dirname, 'src/assets/image')},
                {find: "@component", replacement: path.resolve(__dirname, 'src/components')},
                {find: "@hook", replacement: path.resolve(__dirname, 'src/hooks')},
                {find: "@query", replacement: path.resolve(__dirname, 'src/querys')},
                {find: "@store", replacement: path.resolve(__dirname, 'src/store')},
                {find: "@type", replacement: path.resolve(__dirname, 'src/types')},
                {find: "@page", replacement: path.resolve(__dirname, 'src/page')},
                {find: "@config", replacement: path.resolve(__dirname, 'src/config')},
                {find: "@utils", replacement: path.resolve(__dirname, 'src/utils')},
            ],
            'styled-components': 'styled-components/dist/styled-components.esm.js',
        },
        build: {
            minify: 'esbuild', // esbuild를 미니파이어로 사용
            esbuild: {
                dropConsole: process.env.NODE_ENV !== "development", // 배포 시 모든 console 로그를 제거
            },
            chunkSizeWarningLimit: 3600,
            sourcemap: false,
            rollupOptions: {
                output: {
                    // manualChunks(id) {
                    //     if (id.includes('node_modules')) {
                    //         return id.toString()
                    //             .split('node_modules/')[1]
                    //             .split('/')[0].toString();
                    //     }
                    // },
                    assetFileNames: (assetInfo) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        let extType = assetInfo.name.split(".").at(1);
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                            extType = "img";
                        }
                        return `assets/${extType}/[name]-[hash][extname]`;
                    },
                    chunkFileNames: "assets/js/[name]-[hash].js",
                    entryFileNames: "assets/js/[name]-[hash].js",
                }
            },
            outDir: './dist', // 컨테이너환경에서는 ./dist 로 변경
            assetsDir: 'assets',
            emptyOutDir: true,
            assetsInlineLimit: 0,
        },
    }
})