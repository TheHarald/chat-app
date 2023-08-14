
FROM node:14.17.6-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npx prisma generate
RUN npx prisma db push
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
