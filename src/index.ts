import express, { Request, Response } from 'express'
import env from './config/.env'

const app = express()
const port = env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
