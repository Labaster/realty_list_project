FROM node:20.3 AS build

# Копіюємо файли проекту в контейнер
COPY package.json .
COPY package-lock.json .
COPY index.js .

# Копіюємо папки проекту в контейнер
COPY config config
COPY controllers controllers
COPY model model
COPY public public
COPY routes routes
COPY view view
COPY src src
RUN npm install --production

FROM node:20.3-alpine
# Створюємо робочу деректорію проекту в докер контейнері
RUN mkdir /app
WORKDIR /app
COPY --from=build package.json package.json
COPY --from=build package-lock.json package-lock.json
COPY --from=build index.js index.js
COPY --from=build config config
COPY --from=build controllers controllers
COPY --from=build model model
COPY --from=build public public
COPY --from=build routes routes
COPY --from=build view view
COPY --from=build src src
COPY --from=build node_modules node_modules

EXPOSE 3000

CMD DB_HOST=mongo_db node index.js