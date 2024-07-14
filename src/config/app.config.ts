import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
    port: process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000,
    host: process.env.APP_HOST ?? '0.0.0.0',
    database: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    },
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
}));
