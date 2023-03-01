import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.PORT || 3000;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'text-davinci-003';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
