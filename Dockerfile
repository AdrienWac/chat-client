FROM node:lts-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


FROM development as build

RUN npm run build


FROM nginx:1.15.7-alpine as production

COPY default.conf /etc/nginx/conf.d/

COPY --from=build /app/dist/ /usr/share/nginx/html/

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'