# Studying Prisma Pagination

Let's practicing Prisma ORM doing some pagination

<p align="center">
<a href="#initial-setup">Setup</a>
</p>

## Initial Setup

1. Install Node.js and some Database (SQLite will be used here)

2. `yarn init -y && yarn add prisma @prisma/client typescript ts-node @types/node nodemon`

3. `touch tsconfig.json`
```json
{
    "compilerOptions": {
        "sourceMap": true, 
        "outDir": "dist",
        "strict": true,
        "lib": ["esnext"],
        "esModuleInterop": true,
    }
}
```

4. `npx prisma init --datasource-provider sqlite`

5. Connect Database 
    
    a. Install VSCode extension for Prisma for auto format

    b. If no extension, can run `npx prisma format`

6. Create Schema
```prisma
model Product {
    id              Int         @id @default(autoincrement())
    name            String      @unique
    description     String?

    @@map("product")
}
```

7. `npx prisma migrate dev --name init` - create/run migration

8. `npx prisma studio`
