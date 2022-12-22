import 'reflect-metadata'
import { useExpressServer, useContainer } from "routing-controllers"
import express, { Application, Request, Response } from 'express'
import Container, { Service } from 'typedi'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import CORS from 'cors'
import UserController from './collections/users/users.controller'

@Service()
export default class ExpressServer {
    readonly server: Application
    readonly port: number

    constructor(port = 3000) {
        this.port = port
        this.server = this._expressServer()
    }

    public run(): void {
        this.server.listen(this.port, () => {
            console.log(`Service running on port: ${this.port}`)
        })
    }

    private _expressServer(): Application {
        const app = express()

        app.use(CORS())
        app.use(cookieParser())
        app.use(express.json())
        app.use(morgan('dev'))
        app.get('/', (_req: Request, res: Response) => {
            res.send('Ok')
        })

        useContainer(Container)
        const server = useExpressServer(app, {
            routePrefix: '/api',
            controllers: [
                UserController
            ]
        })

        return server
    }
}