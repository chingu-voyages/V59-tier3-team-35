# Express TS Server Boilerplate

Built with Fastify JS + Typescript + Prisma

### Starting up the Backend Server
Make a copy of `.env.example` and rename as `.env` and fill in the required secrets. <br/>

Simply run the following commands on your terminal

```bash
npm install
npm run db:migrate # this is to migrate schemas to your postgresql db using prisma
npm run db:generate # this is to generate types for your db schema.
npm run dev
```
The server starts running as http://localhost:4000 or whatever port you've set it to listen to. Please ensure the DB is connected before any interactions.

This repository serves both as a reference hub and a testing ground for new ideas, so you may come across some files that aren’t actively in use.