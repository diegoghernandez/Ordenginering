import { createPool } from 'mysql2'
import { ConnectionOptions } from 'mysql2/promise'

const DEFAULT_CONFIG: ConnectionOptions = {
   database: 'pizzadatabase',
   host: 'localhost',
   port: 3306,
   user: 'myuser',
   password: 'secret'
}

const pool = createPool(DEFAULT_CONFIG).promise()

export async function getMySQLConnection() {
   return await pool.getConnection()
}
