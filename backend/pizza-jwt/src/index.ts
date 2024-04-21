import express from 'express'
import jwtController from './web/JwtController'

const app = express()
app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})

app.use('/jwt', jwtController)
