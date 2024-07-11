import 'module-alias/register'
import passport from 'passport'
import displayRoutes from 'express-routemap'
import env from './config/env'
import app from './app'
import { client } from './config/database'
import strategy from './config/passport'

declare global {
    interface BigInt {
        toJSON: () => string
    }
}

BigInt.prototype.toJSON = function () {
    return this.toString()
}

const port = env.PORT

const startServer = async () => {
    try {
        await client
            .connect()
            .then(() => {
                console.log('Connected to database')
                passport.use(strategy)
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
