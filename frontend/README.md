# README

This is a stand Next.js 13 project.

## How to use

```bash
pnpm install
cp .env.example .env
```

- `NEXT_PUBLIC_BACKEND_BASE` the base url of the backend
- `NEXT_PUBLIC_JWT` the static JWT token to use for authentication with our backend
- `NEXT_PUBLIC_CHAIN_ID` the chain id of the chain we are using
- `NEXT_PUBLIC_SENDER_PUBLIC_KEY` Used for magic link. This will be created automatically if using common api

Then run:

```bash
npm run dev
```
