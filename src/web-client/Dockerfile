FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

ENV REACT_APP_API_URL=http://localhost:5000

EXPOSE 3002

CMD [ "npm", "start" ]
