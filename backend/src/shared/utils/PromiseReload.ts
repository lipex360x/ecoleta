import getCallerFile from 'get-caller-file'
import tracer from 'tracer'
import colors from 'colors'

interface RetryProps {
  maxAttempt:number | 'Infinity',
  timeToRetry: number,
  terminalMessage:string,
  functionRetry: any
}

class PromiseReload {
  private count: number
  private logger: tracer.Tracer.Logger

  constructor () {
    this.count = 0
    this.logger = tracer.colorConsole({
      filters: {
        warn: colors.yellow,
        error: [colors.red.bold]
      },
      format: '{{message}}'
    })
  }

  public async execute ({ maxAttempt, timeToRetry, terminalMessage, functionRetry }:RetryProps): Promise<void> {
    const filePath = getCallerFile()

    setTimeout(async () => {
      if (terminalMessage) {
        this.logger.warn(`${filePath} ${functionRetry}`)
        this.logger.warn(`${terminalMessage} - attempt ${this.count} of ${maxAttempt} \n`)
      }

      if (maxAttempt !== Infinity && this.count >= maxAttempt) {
        this.logger.error('☠ Maximum attempts reached')
        process.exit()
      }

      try {
        await functionRetry()
      } catch (error) {
        await this.execute({ maxAttempt, timeToRetry, terminalMessage, functionRetry })
      }
    }, timeToRetry)

    this.count++
  }
}

export default new PromiseReload()
