import winston from 'winston';

const options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console)],
  exitOnError: false,
});

export class LoggerStream {
  write(message: string): void {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
}

export { logger };
