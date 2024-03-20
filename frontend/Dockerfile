FROM node:lts-alpine3.19
WORKDIR /app
COPY . .

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
