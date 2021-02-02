<h2 align="center">Ecoleta - Typescript API Guide</h2>

#### :bookmark_tabs: Content Index

- [Setup](#zap-setup)

- [Package Scripts](#zap-package-scripts)

:house: [Return to Main Folder](https://github.com/lipex360x/ecoleta)

---

#### :zap: Setup

Clone this repository, run `npm i && npm run dev:server` to start the project.

If you prefer, install all dependencies using `yarn` and run `yarn dev:server` to start.

Check more details of this project in the front-end folder

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

:point_up_2: [Go to Content Index](#bookmark_tabs-content-index)

---
