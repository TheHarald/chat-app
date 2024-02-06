### Запуск

- Для запуская необходим Node.js

Установить зависимости

```
npm i
```

Запуск

```
npm run dev
```

Приложение будет доступно по адресу:
http://localhost:3000/

### Для разработки

Сгенерировать БД согласно `schema.prisma`

```bash
npx prisma generate

```

Обновить БД согласно `schema.prisma`

Запустить PrismaStudio

```
npx prisma studio
```

сбросить БД

```
npx prisma migrate reset --force
```

Снихронизировать `schema.prisma` с БД

```
npx prisma db push
```

```bash
docker build -t chat-app .
```

```bash
docker run -d -p 3000:3000 --name chat-app chat-app
```
