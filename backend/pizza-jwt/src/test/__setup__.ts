import { GenericContainer } from 'testcontainers'
import { CustomerRoleRepositoryImpl } from '../repository/CustomerRoleRepositoryImpl.js'

export default async function setup() {
   await new GenericContainer('mysql:8.2')
      .withExposedPorts({
         container: 3306,
         host: 3306
      })
      .withEnvironment({ MYSQL_ROOT_PASSWORD: 'password' })
      .withEnvironment({ MYSQL_DATABASE: 'pizzadatabase' })
      .withEnvironment({ MYSQL_USER: 'myuser' })
      .withEnvironment({ MYSQL_PASSWORD: 'secret' })
      .start()

   await new CustomerRoleRepositoryImpl().initializeTestContainersSetUp()
}
