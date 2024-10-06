FROM node:22

WORKDIR /Split_your_bill/client

COPY client/package.json .
COPY client/package-lock.json .

RUN npm install

COPY client .

ENTRYPOINT [ "npm", "run", "dev" ]