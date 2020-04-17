FROM node:13
WORKDIR /app
ADD . /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./