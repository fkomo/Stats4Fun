FROM node:12.7-alpine AS build
# working directory
WORKDIR /usr/src/app
# install app dependencies
COPY package*.json ./
RUN npm install
# bundle app source
COPY . .

# copy env configuration
RUN rm -frv /usr/src/app/client/.env*
COPY ./client/.env-dev ./client/.env
#COPY ./client/.env-test ./client/.env
#COPY ./client/.env-prod ./client/.env

# build application
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/stats4fun /usr/share/nginx/html
