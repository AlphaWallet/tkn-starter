# Backend

> Note:
>
> This file is only the readme of key information, not a verbose one. Because:
>
> 1. We try to follow `code as the document` style
> 1. All documents can be generated from code automatically, as a dev, you won't need to worry about the inconsistence between `interface document` and `code`.

## Interfaces

- [DB Schema](./src/schemas/)
- [Enviroment Variables](./src/env.ts)
- [API Endpoints & JWT Security Rules](./src/controllers.ts)
- To see swagger documents:
  - `npm start`
  - The link: http://127.0.0.1:3006/documentation

## How to code

There is a simple framework in this code base, see [how to develop](./README-for-Dev.md)

## Don't Miss This!

### Webhook

The actions under `/webhooks` are for two external apis:
