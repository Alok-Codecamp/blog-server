import dotenv from 'dotenv';
import path from 'path';



dotenv.config({ path: path.join(process.cwd(), '.env') })



export default {
    node_env: process.env.NODE_ENV,
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_private_key: process.env.JWT_PRIVATE_KEY
}

