import 'dotenv/config'
import ExpressServer from './server'
import { connect } from './utils/mongo'

(async () => {
    try {
        await connect()
        const PORT = parseInt(process.env.PORT ?? '3000')
        const app = new ExpressServer(PORT)
        
        app.run()
    } catch (error: any) {
        console.log(error.message)
    }
})()