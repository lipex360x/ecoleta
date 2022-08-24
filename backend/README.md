<h2 align="center">Ecoleta - Typescript API Guide</h2>

#### :bookmark_tabs: Content Index

- [Setup](#zap-setup)

- [Package Scripts](#zap-package-scripts)

- [Technologies](#zap-technologies)

:house: [Return to Main Folder](https://github.com/lipex360x/ecoleta)

---

#### :zap: Setup

Clone the main repository, then enter this folder and run `npm i` or `yarn` to install all dependencies.

After that, move a copy of `.env.example` to `.env` and `ormconfig.js.example` to `ormconfig.js` and enter all the data.

📌 Tips: If you decide to use Postgres with docker, this project provides a docker-compose file.

Execute the migrations with `npm run orm:run` or `yarn orm:run`

After, execute the seeds with `npm run seed:run` or `yarn seed:run`

Then, execute the project with `npm run dev:server` or `yarn dev:server`

Check more executable scripts in the `package.json` file and more details of this project in the front-end folder

📌 Tips: for easier navigation by gihub, consider installing the [Octotree](https://chrome.google.com/webstore/detail/octotree-github-code-tree/bkhaagjahfmjljalopjnoealnfndnagc) Plugin

---

#### :zap: Package Scripts

* Start Server 
```
> Develop Mode
yarn dev:server

> Production Mode (after build)
yarn start
```

* TypeORM CLI 
```
> default CLI
yarn orm 

> Create a Migration
yarn orm:create nameMigration 

> Execute Migrations
yarn orm:run 

> Revert Migration (one to one)
yarn orm:revert 

> Displays migrations performed
yarn orm:show 

> Execute Seeds
yarn seed:run 

```

* Jest Test CLI
```
> Execute all Tests
yarn test

> Execute one specific Test
yarn test:v testPath

> Clear Test Cache
yarn test:c testPath

```

* Babel Build
```
yarn build
```

---

#### :zap: Technologies

```js
  Express
  Typescript
  TypeORM
  TDD with JEST
  DDD with SOLID
  Validation with Celebrate
```

:point_up_2: [Go to Content Index](#bookmark_tabs-content-index)

---
