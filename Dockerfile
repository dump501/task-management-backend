FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm --version

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "node", "./src/index.js" ]