FROM node:22

WORKDIR /Split_your_bill/server

COPY server/package.json .
COPY server/package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "dev" ]