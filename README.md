# Next.js and Prisma integration tests example

[![CI](https://github.com/andersnylund/next-js-prisma-integration-tests/actions/workflows/main.yml/badge.svg)](https://github.com/andersnylund/next-js-prisma-integration-tests/actions/workflows/main.yml)

This an example repository that I made in conjuction with writing a short blog post about integration testing prisma. The blog post can be found from [Next.js and Prisma integration tests | andersnylund](https://blog.andersnylund.com/next-js-prisma-integration-tests/)

## Uses

- [`next.js`](https://nextjs.org/)
- [`prisma`](https://www.prisma.io/)
- [`next-connect`](https://github.com/hoangvvo/next-connect)
- [`jest`](https://jestjs.io/)
- [`TypeScript`](https://www.typescriptlang.org/)

## Requirements

- Node version 12
- Yarn version 1
- Docker

## Setup and running app/tests

1. `yarn install` – Install dependencies
2. `docker-compose up -d` – Start the local docker databases
3. `yarn dev` – Start the local development server
4. `yarn test` – Run the tests
