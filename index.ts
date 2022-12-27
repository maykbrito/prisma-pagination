import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({ log: ["error", "info", "query", "warn"]})

const app = express()
app.use(express.json())


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

app.listen('2222')