import express, { Request, Response } from 'express'
import { routerv1 } from './routes/index'
import cors from 'cors'
import errorMiddleware from './middlewares/errorMidddleware'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
)

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

app.use('/v1', routerv1)

app.use(errorMiddleware)

export default app
