import { GenericContainer } from 'testcontainers'
import { CustomerRoleMysql } from '../../repository/CustomerRoleMysql.js'

export default async function () {
	const mysqlContainer = await new GenericContainer('mysql:8.2')
		.withExposedPorts({
			container: 3306,
			host: 3306,
		})
		.withEnvironment({ MYSQL_ROOT_PASSWORD: 'password' })
		.withEnvironment({ MYSQL_DATABASE: 'pizzadatabase' })
		.withEnvironment({ MYSQL_USER: 'myuser' })
		.withEnvironment({ MYSQL_PASSWORD: 'secret' })
		.start()

	const port = mysqlContainer.getMappedPort(3306)
	const host = mysqlContainer.getHost()
	console.log(`Running Mysql on ${host}:${port}`)

	await new CustomerRoleMysql().initializeTestContainersSetUp()

	return async () => {
		await mysqlContainer.stop()
	}
}
