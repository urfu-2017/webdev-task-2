import dotenv from 'dotenv'
dotenv.load()

export default {
    AUTH_TOKEN: process.env.AUTH_TOKEN,
    PORT: process.env.PORT
}
