import express from 'express'
import authRoute from './v1/authRoute'
import userRoute from './v1/userRoute'
import noteRoute from './v1/noteRoute'
import photoRoute from './v1/photoRoute'

const routerv1 = express.Router()

routerv1.use('/auth', authRoute)
routerv1.use('/users', userRoute)
routerv1.use('/notes', noteRoute)
routerv1.use('/photos', photoRoute)
// routerv2.use('path',anotherRouter)

export { routerv1 }
