FROM node:12

WORKDIR /home/api

COPY packages.json .

COPY packages-lock.json .

RUN pnpm intall

CMD pnpm run start:dev