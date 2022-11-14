FROM node:18.1.0-alpine
WORKDIR /app
COPY . /app
RUN yarn install
CMD ["yarn start"]