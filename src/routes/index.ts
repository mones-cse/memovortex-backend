import express from 'express'
import authRoute from './v1/authRoute'
import userRoute from './v1/userRoute'
import noteRoute from './v1/noteRoute'
import documentRoute from './v1/documentRoute'
import deckRoute from './v1/deckRoute'
import cardRoute from './v1/cardRoute'

const routerv1 = express.Router()

routerv1.use('/auth', authRoute)
routerv1.use('/users', userRoute)
routerv1.use('/notes', noteRoute)
routerv1.use('/documents', documentRoute)
routerv1.use('/deck', deckRoute)
routerv1.use('/card', cardRoute)
// routerv2.use('path',anotherRouter)

export { routerv1 }
