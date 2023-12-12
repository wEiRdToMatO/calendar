# syntax=docker/dockerfile:1

FROM node:18-alpine as build-env
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.3-alpine as runtime
COPY --from=build-env /src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]