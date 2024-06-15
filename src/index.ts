import displayRoutes from 'express-routemap'
import express, { Request, Response } from 'express'
import env from './config/.env'
import { routerv1 } from './routes/index'

const app = express()
const port = env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})
app.use('/v1', routerv1)

app.listen(port, () => {
    displayRoutes(app)
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
