import 'reflect-metadata'
import { useExpressServer, useContainer } from "routing-controllers"
import express, { Application, Request, Response } from 'express'
import Container, { Service } from 'typedi'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import CORS from 'cors'
import { join } from 'path'
import bodyParser from 'body-parser'
import { ILogger } from './utils/logger'

@Service()
export default class ExpressServer {
    readonly server: Application
    readonly port: number
    readonly logger: ILogger

    constructor(logger: ILogger, port = 3000) {
        this.port = port
        this.logger = logger
        this.server = this._expressServer()
    }

    public run(): void {
        this.server.listen(this.port, () => {
            this.logger.info(`Service running on port: ${this.port}`)
        })
    }

    private _expressServer(): Application {
        const app = express()

        app.use(CORS())
        app.use(cookieParser())
        app.use(express.json())
        app.use(bodyParser.json({ limit: '50mb'}))
        app.use(morgan('dev'))
        app.get('/', (_req: Request, res: Response) => {
            res.send('Ok')
        })
        app.disable('x-powered-by')

        useContainer(Container)
        
        const server = useExpressServer(app, {
            routePrefix: '/api',
            controllers: [
                join(__dirname + `/collections/**/*.controller.${process.env.NODE_ENV === 'production' ? 'js': 'ts'}`)
            ]
        })

        return server
    }
}