import displayRoutes from 'express-routemap'
import express, { Request, Response } from 'express'
import env from './config/.env'
import { routerv1 } from './routes/index'

// import { validateData } from './middleware/validationMiddleware'
// import { userSignupSchema } from './validations/auth.validation'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
})

// app.post('/test', validateData(userSignupSchema), (req: Request, res: Response) => {
//     res.json({ message: 'User registered successfully', data: req.body })
// })

app.use('/v1', routerv1)

app.listen(port, () => {
    displayRoutes(app)
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
