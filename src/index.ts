import 'dotenv/config'
import Container from 'typedi'
import { ILogger, PinoLogger } from './utils/logger'
import ExpressServer from './server'
import { connect } from './utils/mongo'

(async () => {
    const logger: ILogger = Container.get(PinoLogger)
    try {
        await connect()
        const PORT = parseInt(process.env.PORT ?? '3000')
        const app = new ExpressServer(logger, PORT)

        app.run()
    } catch (error) {
        logger.error(error.message)
    }
})()