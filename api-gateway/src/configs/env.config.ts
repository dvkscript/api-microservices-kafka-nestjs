import { get } from 'env-var';
import '../libs/utils/dotenv';
// import { Dialect } from 'sequelize';

export default {
    // db: {
    //     dialect: get('DB_DIALECT').required().asString() as Dialect || "postgres",
    //     host: get('DB_HOST').required().asString(),
    //     port: get('DB_PORT').required().asIntPositive(),
    //     username: get('DB_USERNAME').required().asString(),
    //     password: get('DB_PASSWORD').required().asString(),
    //     database: get('DB_NAME').required().asString(),
    // },
    jwt: {
        secret: get('JWT_SECRET').required().asString(),
    },
    system: {
        ollamaApiUrl: get('OLLAMA_API_URL').required().asString(),
    },
    // cloudinary: {
    //     cloudName: get('CLOUDINARY_CLOUD_NAME').required().asString(),
    //     apiKey: get('CLOUDINARY_API_KEY').required().asString(),
    //     apiSecret: get('CLOUDINARY_API_SECRET').required().asString(),
    //     folderName: "upload-api",
    //     apiUrl: get("CLOUDINARY_API_URL").required().asString(),
    // },
    kafka: {
        brokers: get("KAFKA_BROKERS").required().asString().split(", "),
        clientId: get("KAFKA_CLIENT_ID").required().asString(),
        consumerGroup: get("KAFKA_CONSUMER_GROUP").required().asString(),
    }
}