import { ConnectionOptions, createPool } from 'mysql2/promise'
import { CustomerRole, CustomerRoleId, CustomerRoleRepository } from '../../types.js'

const DEFAULT_CONFIG: ConnectionOptions = {
   database: 'pizzadatabase',
   host: 'localhost',
   port: 3306,
   user: 'myuser',
   password: 'secret'
}

const connection = createPool(DEFAULT_CONFIG)

export class CustomerRoleRepositoryImpl implements CustomerRoleRepository {
   existById = async (id: number) => {
      const [result] = await connection.query<CustomerRoleId[]>(
         'SELECT customer_role_id from customer_role WHERE customer_role_id = ?;', [id]
      )

      return result
   }

   geByCustomerRoleId = async (id: number) => {
      const [customerRole] = await connection.query<CustomerRole[]>(`
         SELECT customer_role.customer_role_id, role.role_name  FROM customer_role
         JOIN role ON customer_role.role_id = role.role_id
         WHERE customer_role.customer_role_id = ?;
      `, [id])

      return customerRole
   }

   save = async (id: number) => {

      await connection.query(`
         INSERT INTO customer_role(customer_role_id, role_id) VALUES 
            (?, (SELECT role_id FROM role WHERE role_name = 'USER' LIMIT 1));
      `, [id])
   }

   initializeTestContainersSetUp = async () => {

      await connection.query(`
         CREATE TABLE IF NOT EXISTS role (
            role_id SMALLINT AUTO_INCREMENT,
            role_name VARCHAR(10) UNIQUE,
            PRIMARY KEY(role_id)
         );
      `)

      await connection.query(`
         CREATE TABLE IF NOT EXISTS customer_role (
            customer_role_id BIGINT,
            role_id SMALLINT NOT NULL,
            created_at DATETIME DEFAULT NOW(),
            FOREIGN KEY (role_id) REFERENCES role(role_id),
            PRIMARY KEY(customer_role_id)
         );
      `)

      await connection.query('INSERT INTO role(role_name) VALUES (\'USER\'), (\'ADMIN\'), (\'DEMO\');')
      await connection.query('INSERT INTO customer_role(customer_role_id, role_id) VALUES (1, 1), (2, 1), (3, 3), (4, 1), (5, 2);')
   }
}
