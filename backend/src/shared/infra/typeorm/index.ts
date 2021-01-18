import { createConnections } from 'typeorm'
import promiseReload from '@shared/utils/PromiseReload'

class OrmConnect {
  async execute () {
    try {
      const connect = await createConnections()
      const { database } = connect[0].options

      console.log(`Connected to database ${database}`)
    } catch (error) {
      await promiseReload.execute({
        maxAttempt: 5,
        terminalMessage: 'Trying to connect to database',
        timeToRetry: 2000,
        functionRetry: () => { return this.execute() }
      })
    }
  }
}

export default new OrmConnect().execute()
