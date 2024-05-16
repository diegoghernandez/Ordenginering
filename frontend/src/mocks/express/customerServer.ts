import express from 'express'

const app = express()
app.use(express.json())

const PORT = 8765

app.get('/customer/32', (_req, res) => {
   res.status(200).json({
      'customerName': 'Customer',
      'email': 'random@random.com',
      'birthDate': '2002-06-12'
   })
})

app.listen(PORT)