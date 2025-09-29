FROM node:20-alpine AS build
WORKDIR /app

# 빌드 인자로 환경 변수 받기
ARG VITE_REACT_APP_KAKAO_JS_KEY
ARG VITE_MAP_SERVER_CONTEXT_PATH
ARG VITE_MAP_SERVER_PORT
ARG VITE_API_BASE_URL
ARG VITE_MAP_FRONT_PORT

# 환경 변수로 설정 (빌드 시점에서 사용)
ENV VITE_REACT_APP_KAKAO_JS_KEY=$VITE_REACT_APP_KAKAO_JS_KEY
ENV VITE_MAP_SERVER_CONTEXT_PATH=$VITE_MAP_SERVER_CONTEXT_PATH
ENV VITE_MAP_SERVER_PORT=$VITE_MAP_SERVER_PORT
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_SERVER_DOMAIN=$VITE_SERVER_DOMAIN
ENV VITE_MAP_FRONT_PORT=$VITE_MAP_FRONT_PORT

# 패키지 파일 복사 및 의존성 설치
COPY package*.json yarn.lock* ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx-backoffice.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]