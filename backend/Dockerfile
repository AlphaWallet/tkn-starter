FROM node:16-alpine as builder

COPY . /usr/src/app/
RUN --mount=type=cache,target=/root/.npm \
    cd /usr/src/app/ && \
    npm ci && \
    npm run build

FROM node:16-alpine
LABEL org.opencontainers.image.authors="Feng Yu<abcfy2@163.com>"

COPY --from=0 /usr/src/app/dist/ /usr/src/app/
# dd-trace auto instrumentation does not work with @vercel/ncc bundled packages
# as a workaround, we excluded `fastify` and `pino` from being bundled
# so the service still need to load those packages from `node_modules`
COPY --from=0 /usr/src/app/node_modules /usr/src/app/node_modules/
ENV FASTIFY_PORT=3006
ENV FASTIFY_ADDRESS=0.0.0.0
EXPOSE ${FASTIFY_PORT}

RUN adduser -s /bin/false -S -D -H app
USER app

CMD ["node", "/usr/src/app/index.js"]
