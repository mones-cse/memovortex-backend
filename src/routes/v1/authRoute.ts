import express from 'express'
const router = express.Router()

router.use((req, res, next) => {
    console.log('Auth middleware')
    next()
})

router.get('/login', (req, res) => {
    res.send('Login page')
})

router.post('/login', (req, res) => {
    res.send('Login page post method')
})

router.get('/register', (req, res) => {
    res.send('Register page')
})

router.post('/register', (req, res) => {
    res.send('Register page post method')
})

router.get('/logout', (req, res) => {
    res.send('Logout page')
})

export default router
