import dotenv from "dotenv";

dotenv.config({ quiet: true });

const env = process.env;

const Envs = {
    PORT: env.PORT || 2005,
    MONGO_URL: env.MONGO_URL,
}


export default Envs;