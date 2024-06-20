import express, { Request, Response } from 'express'
import { routerv1 } from './routes/index'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

app.use('/v1', routerv1)

export default app
