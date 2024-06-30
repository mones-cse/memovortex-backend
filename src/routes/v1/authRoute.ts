import express from 'express'
import validateData from '../../middlewares/validationMiddleware'
import { userSignupSchema, userLoginSchema } from '../../validations/auth.validation'
import authController from '../../contollers/auth.controller'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Auth middleware')
    next()
})

router.post('/register', validateData(userSignupSchema), authController.signup)

router.post('/login', validateData(userLoginSchema), authController.login)

router.post('/refresh-token', authController.newAccessTokenByRefreshToken)

router.post('/forgot-password', (req, res) => {
    res.send('Forgot password page post method')
})

router.post('/reset-password', (req, res) => {
    res.send('Reset password page post method')
})

router.post('/send-verification-email', (req, res) => {
    res.send('Send verification page post method')
})
router.post('/verify-email', (req, res) => {
    res.send('Verify email page post method')
})

router.get('/logout', (req, res) => {
    res.send('Logout page')
})

export default router
