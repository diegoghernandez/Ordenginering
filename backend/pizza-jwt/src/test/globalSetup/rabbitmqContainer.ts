import { GenericContainer, Wait } from 'testcontainers'

export default async function() {
   const rabbitmqContainer = await new GenericContainer('rabbitmq:3.13-management')
         .withExposedPorts({
            container: 5672,
            host: 5672
         })
         .withWaitStrategy(Wait.forLogMessage('Server startup complete'))
         .withStartupTimeout(30_000)
         .start()

      const port = rabbitmqContainer.getMappedPort(5672)
      const host = rabbitmqContainer.getHost()
      console.log(`Running RabbitMQ on ${host}:${port}`)

      return async () => {
         await rabbitmqContainer.stop()
      }
}
