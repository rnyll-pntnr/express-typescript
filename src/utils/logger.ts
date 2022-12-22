import pino, { Logger } from 'pino'
import { Service } from 'typedi'
import moment from 'moment'

export interface ILogger {
    info: (message: string) => void,
    warn: (message: string) => void,
    error: (message: string) => void
}

@Service()
export class PinoLogger implements ILogger {
    private readonly logger: Logger;

  constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
      },
      base: {
        pid: false,
      },
      timestamp: () => `,"time":"${moment()}"`,
    });
  }

  info(message = ''): void {
    this.logger.info(message);
  }

  warn(message = ''): void {
    this.logger.warn(message);
  }

  error(message = ''): void {
    this.logger.error(message);
  }
}