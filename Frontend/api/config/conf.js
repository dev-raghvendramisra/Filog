import dotenv from 'dotenv'
dotenv.config()

const conf = Object.freeze({
    DB_API_ENDPOINT:String(process.env.DB_API_ENDPOINT),
    FRONTEND_ENDPOINT: String(process.env.FRONTEND_ENDPOINT),
})

export default conf
