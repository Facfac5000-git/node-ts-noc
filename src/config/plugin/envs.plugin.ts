import env from 'env-var';

export const envsPlugin = () => {
    const PORT: number = env.get('PORT').required().asPortNumber();
    const MAILER_SERVICE: string = env.get('MAILER_SERVICE').required().asString();
    const MAILER_EMAIL: string = env.get('MAILER_EMAIL').required().asEmailString();
    const MAILER_SECRET_KEY: string = env.get('MAILER_SECRET_KEY').required().asString();
    const PROD: boolean = env.get('PROD').required().asBool();

    const MONGO_USER: string = env.get('MONGO_USER').required().asString();
    const MONGO_PASS: string = env.get('MONGO_PASS').required().asString();
    const MONGO_DB_NAME: string = env.get('MONGO_DB_NAME').required().asString();
    const MONGO_URL: string = env.get('MONGO_URL').required().asString();
    
    return {
        PORT,
        MAILER_SERVICE,
        MAILER_EMAIL,
        MAILER_SECRET_KEY,
        PROD,
        MONGO_USER,
        MONGO_PASS,
        MONGO_DB_NAME,
        MONGO_URL
    };
}
