FROM node:lts as build

WORKDIR /app

# Set environment variables
ENV VITE_APP_KAKAO_ID=DX636IQUIWZK \
    VITE_APP_KAKAO_SECRET_KEY=DX636IQUIWZK5TIA:ezmzIaUc81b7qrt5 \
    VITE_APP_YORKIE_API_KEY=clskuqbj2k70uv115dv0

COPY idearly/package.json .

RUN yarn install

COPY idearly/ .

RUN yarn build

FROM nginx:stable-alpine

# nginx의 기본 설정을 삭제하고 앱에서 설정한 파일을 복사
RUN rm -rf /etc/nginx/conf.d
COPY idearly/conf /etc/nginx

# 위 스테이지에서 생성한 빌드 결과를 nginx의 샘플 앱이 사용하던 폴더로 이동
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000

# nginx 실행
CMD [ "nginx", "-g", "daemon off;" ] 