import dotenv from "dotenv";

dotenv.config({ quiet: true });

const env = process.env;

const Envs = {
    PORT: env.PORT || 2005,

    // mongo url 
    MONGO_URL: env.MONGO_URL,

    // jwt secret 
    JWT_SECRET: env.JWT_SECRET,
}


export default Envs;