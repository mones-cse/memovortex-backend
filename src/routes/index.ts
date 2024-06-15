import express from 'express'
import authRoute from './v1/authRoute'
const routerv1 = express.Router()

routerv1.use('/auth', authRoute)
// routerv2.use('path',anotherRouter)

export { routerv1 }
