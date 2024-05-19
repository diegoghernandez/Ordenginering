import { getJSON } from '../utils/getJSON'
import express from 'express'

const customerApp = express()
customerApp.use(express.json())

const CUSTOMER_PORT = 8765

customerApp.get('/customer/32', (_req, res) => {
   res.status(200).json(getJSON('../mocks/fixtures/customer.json'))
})

customerApp.listen(CUSTOMER_PORT)

const dataApp = express()
dataApp.use(express.json())

const DATA_PORT = 4436

dataApp.get('/data/order/customer/32', (_req, res) => {
   res.status(200).json(getJSON('../mocks/fixtures/orders.json'))
})

dataApp.listen(DATA_PORT)