# Commands
- npm run start:dev
- npx typeorm migration:run
- npx typeorm migration:revert
- npx typeorm migration:create src/migrations/CoffeeRefactor
- npx typeorm migration:generate src/migrations/SchemaSync
- npm run build
- npx typeorm migration:generate src/migrations/Init -d src/data-source.ts
- npx typeorm migration:run -d src/data-source.ts
- npx typeorm migration:revert -d src/data-source.ts

# Docker
- docker-compose up -d
- docker-compose down
