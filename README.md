# EpicureExplore

Ý nghĩa: "Epicure" (người sành ăn) và "Explore" (khám phá) tạo ra một ý tưởng về việc khám phá và thử nghiệm các công thức mới mỗi ngày.

A recipe sharing application built with Express, Knex.js, MySQL on the backend, and Vue.js, Pinia, Bootstrap 4 on the frontend.

## Installation Guide

### Backend (`recipe-sharing-be`)

1. To install necessary packages:

   ```bash
   npm install

   ```

2. Configure knexfile.js with your database credentials: username, password, and database name.
3. Create a database with the same name as configured.
4. Apply all unrun migrations:

   ```bash
   npx knex migrate:latest

   ```

5. (Optional) Configure .env if you wish to use the reset password feature.
6. Run the project:
   ```bash
   npm start
   ```

### Frontend (`recipe-sharing-fe`)

1. To install necessary packages:

   ```bash
   npm install

   ```

2. Run the project:
   ```bash
   npm run serve
   ```

## Contributions

All contributions are welcome. If you wish to contribute, please create a pull request.
