import express from 'express'
import authRoute from './v1/authRoute'
import userRoute from './v1/userRoute'

const routerv1 = express.Router()

routerv1.use('/auth', authRoute)
routerv1.use('/users', userRoute)
// routerv2.use('path',anotherRouter)

export { routerv1 }
