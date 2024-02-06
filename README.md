<h2>Технологии</h2>
<ul>
  <li>Next.js</li>
  <li>TypeScript</li>
  <li>Redux</li>
  <li>Redux Saga</li>
  <li>Tailwind CSS</li>
  <li>Next UI</li>
  <li>PrismaORM</li>
  <li>Socket.IO</li>
  <li>JWT</li>
</ul>
  
<h2>Установка и запуск</h2>
<p>Для запуска необходим node.js</p>

<p>Установка зависимотсетей</p>

```bash
npm install
```
<p>Запуск в режиме разработки</p>

```bash
npm run dev
```

<p>Сборка продакшен версии</p>

```bash
npm run build
```

<p>Запуск продакшен версии</p>

```bash
npm run start
```


<h2>Запуск в докер контейнере</h2>

```bash
docker build -t web-games .
```

```bash
docker run -d -p 3000:3000 --name web-games web-games
```

<h2>Работа с Prisma ORM</h2>
Сгенерировать БД согласно ```schema.prisma```

```bash
npx prisma generate
```

Запустить PrismaStudio
```
npx prisma studio
```

Cбросить БД
```
npx prisma migrate reset --force
```

Снихронизировать ```schema.prisma``` с БД

```
npx prisma db push
```
<h2>Запуск в докер контейнере</h2>

```bash
docker build -t chat-app .
```

```bash
docker run -d -p 3000:3000 --name chat-app chat-app
```
