import express from 'express'
import isAuthentic from '../../middlewares/isAuthentic'
import validateData from '../../middlewares/validationMiddleware'
import { userAccountInfoSchema } from '../../validations/user.validation'
import userController from '@src/contollers/user.controller'
const router = express.Router()

router.use((req, res, next) => {
    console.log('User middleware')
    next()
})
router.post('/', (req, res) => {
    res.send('create a new user post method')
})

router.get('/', (req, res) => {
    res.send('list of all user get method')
})

router.get('/profile', isAuthentic, (req, res) => {
    res.send(JSON.stringify(req.user))
})

router.patch('/profile', isAuthentic, validateData(userAccountInfoSchema), userController.updateUserAccountInfo)

router.get('/:userId', (req, res) => {
    res.send('get a user by id get method')
})

router.patch('/:userId', (req, res) => {
    res.send('update a user by id patch method')
})

router.delete('/:userId', (req, res) => {
    res.send(' get a user by id delete method')
})

export default router
