FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm i --force
ADD . .

RUN npm run build --force

CMD ["node", "./dist/main.js"]

