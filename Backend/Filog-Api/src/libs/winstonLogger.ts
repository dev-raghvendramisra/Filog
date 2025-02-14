import { transports, format, createLogger} from 'winston'
import path from 'path'
const envLogFilePath = path.join(__dirname,'../logs/env.log');
const accessLogFilePath = path.join(__dirname,'../logs/access.log');

const envLogger = createLogger({
    transports:[
        new transports.Console({
            level: 'debug',
            format:format.combine(
                format.timestamp({
                    format:()=> new Date().toUTCString()
                }),
                format.colorize(),
                format.printf(info => `\n[${info.timestamp}] \n${info.level}: ${info.message}`)
            )

            
        }),

        new transports.File({
           level: 'debug',
           filename: envLogFilePath,
           format:format.combine(
            format.timestamp({
                format:()=> new Date().toUTCString()
            }),
            format.printf(info => `\n[${info.timestamp}] \n${info.level}: ${info.message}`)
           )
        })
    ]
})

const accessLogger = createLogger({
    transports:[
        new transports.File({
            level: 'info',
            filename: accessLogFilePath,
            format : format.combine(
                format.timestamp({
                    format:()=> new Date().toUTCString()
                }),
                format.printf(info => `\n[${info.timestamp}] \n${info.level}: ${info.message}`)
            )
        })
    ]
})

export {accessLogger,envLogger}