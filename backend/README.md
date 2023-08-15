# Backend

The backend is the api server for the frontend.

## Install Dependencies

```shell
npm i
```

The key tools used in this code:

- fastify
- drizzle + node-pg
- axios
- zod

## How To Deploy

1. apply api-key for stl common api and set it to env variable `PROJECT_API_KEY`
1. generate db migration script, see [here](./README-for-Dev.md#dbm-flow)
1. generate jwt for the frontend: `npm run jwt`.
   - note: set env variable `JWT_SECRET` before running the command.
1. `npm start`

## Interfaces

Basically, the code is simple and easy to understand, devs can refer to the code in the files to know what to do.

- [DB Schema](./src/schemas/)
- [Enviroment Variables](./src/env.ts)
- [API Endpoints & JWT Security Rules](./src/controllers.ts)
   - All request and response are typed, you can find the schema definition example in [this file](./src/handlers/ticketsActions.ts).
- To see swagger documents:
  - `npm start`
  - The link: http://127.0.0.1:3006/documentation

The key functions about stl common api are all in [this file](./src/services/commonApi.ts):

- `createTicketLink`, create a ticket attestation. Note:
   - devs need to set `DEVCON_ID`, `TICKET_CLASS` in [constant.ts](./src/constant.ts) first.
   - returned value is a url including ticket attestation, the url root of it is defined by the env variable `ROOT_URL_PREFIX`.
- `verifyTicket`, verify a ticket attestation.
- `sendMail`, send a mail. note, if you want to use stl common api to send emails including, you need to follow the conventions:
   - the `templateUrl` can be accessed by stl common api server.
   - the template content must be in html.
   - the variable in the template is like "${variable}", you can include as many as you like.
   - the `params` is a json object including the values of the variables. for example, if there are variables "${var1}" and "${var2}" in the template, then its value is like: `{var1: value1, var2: value2}`.

For others, please check the code in the files.

## How To Code

There is a simple framework in this code base, see [how to develop](./README-for-Dev.md)