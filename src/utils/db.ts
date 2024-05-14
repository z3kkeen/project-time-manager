import { Pool } from 'pg';

export const db = new Pool({
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    host: process.env.HOST
})