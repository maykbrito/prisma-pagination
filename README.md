# Studying Prisma Pagination

Let's practicing Prisma ORM doing some pagination

---

<p align="center">
<a href="#initial-setup">Initial setup</a> | 
<a href="#server-setup">Server setup</a> | 
<a href="#search-and-pagination">Search and pagination</a> | 
<a href="#celebrate">Celebrate</a>
</p>

---

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

9. Add about 5 differente products to test later

## Server setup

1. `yarn add express @types/express`

2. `touch index.ts`
```ts
import express from 'express'

const app = express()
app.use(express.json())

app.listen('2222')
```

## Search and Pagination

1. add get /search route
```ts
import express, { Request, Response } from 'express'

//...

app.get('/search', async(req: Request, res: Response) => {

})

//...
```

2. `npx prisma generate`

3. add the generated database client
```ts
import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ["error", "info", "query", "warn"]})
```

4. add the search logic
```ts
app.get('/search', async(req: Request, res: Response) => {
    const search = req.query.q || ''
    const take = req.query.take || 10
    const skip = req.query.skip || 0

    try {
        const result = await prisma.product.findMany({
            where: {
                name: {
                    contains: String(search)
                }
            },
            take: Number(take),
            skip: Number(skip),
        })

        return res.json(result)
    } catch(error) {
        console.log(error)
        return res.send(500).json({error})
    }
})
```

5. add dev script to package.json
```json
"scripts": {
    "dev": "nodemon index.ts"
},
```

6. run dev server `yarn dev`

7. open browser and test `http://localhost:2222/search/?q=a&take=2&skip=2`

## Celebrate 

🎉 Well done!