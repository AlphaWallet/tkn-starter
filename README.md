# tkn-starter

This project is a project template which shows how to use STL infrastructure to implement an attestation based solution.

The whole repo layout:

- frontend, ui components and logic
- backend, an api server for the frontend
- resources, static assets used for the backend, which can be uploaded to any storage like aws s3

The whole architecture looks like:

```text

frontend ---> backend ---> stl-api ---> aws ses
                 |          |
                 |          |
                 |--> s3 <--|
```

The `stl api` provides multiple features which might be opensourced later. Two of them are used in the repos:

- sending email, that's why `s3` and `aws ses` are here.
  - s3 is for saving the assets in `resouces`.
    - it can be replaced with any storages.
    - stl api can access it
  - aws ses is for email sending.
- magiclink generation and verification.

If you want to use your own mail service, you can ignore "sending email" safely.

This repo asks `api-key` from `stl-api`, if you want to run this demo, please contact us or leave a message as a github issue.

## How to run it

### Before

Final check schema definitions, mainly on `index` design.

> regenerate migration files if required, `npm run generate`

The backend will run the migration scripts automatically when it is starting.

### Steps

1. get the api-key for stl-api
1. deploy `frontend`
1. deploy `backend`

## Dev Notes

This demo uses `drizzle` as the orm npm and `postgres` for database service. You can change it to any databases `drizzle` support, but please remember to adjust the db related code for your choice.

If you are using `postgres`, please make sure:

1. using `drizzle orm` + `pg`
   - using `postgres.js`, `drizzle orm` can't save json obj into PG as jsonb correctly, see [this issue](https://github.com/drizzle-team/drizzle-orm/issues/724).
1. using `"pg": "8.10.0",`, otherwise, it will throw an error about "can't connect to cloudflare ...", see [this issue](https://github.com/brianc/node-postgres/issues/2987)
