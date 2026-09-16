FROM node:alpine AS development
WORKDIR /usr/src/app

# copy the package files for installing deps
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# install pnpm and the deps
RUN npm install -g pnpm
RUN pnpm install

# copy all the project files
COPY . .

# build the project
RUN pnpm run build

FROM node:alpine AS production

# set the node env
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# copy the package files for installing deps
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# install pnpm and the deps
RUN npm install -g pnpm
RUN pnpm install --prod

# copy the code from the development stage
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]