import env from 'env-var';

export const envsPlugin = () => {
    const PORT: number = env.get('PORT').required().asPortNumber();
    const MAILER_EMAIL: string = env.get('MAILER_EMAIL').required().asEmailString();
    const MAILER_SECRET_KEY: string = env.get('MAILER_SECRET_KEY').required().asString();
    const PROD: boolean = env.get('PROD').required().asBool();

    return {
        PORT,
        MAILER_EMAIL,
        MAILER_SECRET_KEY,
        PROD
    };
}
