import displayRoutes from 'express-routemap'
import env from './config/.env'
import app from './app'
import { client } from './config/database'
const port = env.PORT

const startServer = async () => {
    try {
        await client
            .connect()
            .then(() => {
                console.log('Connected to database')
                app.listen(port, () => {
                    displayRoutes(app)
                    console.log(`[server]: Server is running at http://localhost:${port}`)
                })
            })
            .catch((error) => {
                console.log('Error connecting to database: ', error)
            })
    } catch (error) {
        console.log('Error connecting to database: ', error)
    }
}

startServer()
