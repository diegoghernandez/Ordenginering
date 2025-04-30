import { createPool, PoolOptions } from 'mysql2/promise'
import {
	CustomerRole,
	CustomerRoleId,
	CustomerRoleRepository,
	SelectOne,
} from '../../types.js'
import { MYSQL_SECRETS } from '../env/mysqlSecrets.js'

const MYSQL_CONFIG: PoolOptions = {
	database: 'pizzadatabase',
	host: MYSQL_SECRETS.MYSQL_DOMAIN ?? 'localhost',
	port: Number(MYSQL_SECRETS.MYSQL_PORT ?? 3306),
	user: MYSQL_SECRETS.MYSQL_USERNAME ?? 'myuser',
	password: MYSQL_SECRETS.MYSQL_PASSWORD ?? 'secret',
}

const connection = createPool(MYSQL_CONFIG)

export class CustomerRoleMysql implements CustomerRoleRepository {
	databaseIsAvailable = async () => {
		const [result] = await connection.query<SelectOne[]>('SELECT 1;')

		return result.length !== 0
	}

	existById = async (id: number) => {
		const [result] = await connection.query<CustomerRoleId[]>(
			'SELECT customer_role_id from customer_role WHERE customer_role_id = ? LIMIT 1;',
			[id]
		)

		return result.length !== 0
	}

	geByCustomerRoleId = async (id: number) => {
		const [customerRole] = await connection.query<CustomerRole[]>(
			`
         SELECT customer_role.customer_role_id, role.role_name  FROM customer_role
         JOIN role ON customer_role.role_id = role.role_id
         WHERE customer_role.customer_role_id = ?;
      `,
			[id]
		)

		return customerRole
	}

	save = async (id: number) => {
		await connection.query(
			`
         INSERT INTO customer_role(customer_role_id, role_id) VALUES 
            (?, (SELECT role_id FROM role WHERE role_name = 'USER' LIMIT 1));
      `,
			[id]
		)
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

		await connection.query(
			"INSERT INTO role(role_name) VALUES ('USER'), ('ADMIN'), ('DEMO');"
		)
		await connection.query(
			'INSERT INTO customer_role(customer_role_id, role_id) VALUES (1, 1), (2, 1), (3, 3), (4, 1), (5, 2);'
		)
	}
}
