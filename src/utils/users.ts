'use server'
import { db } from './db';

export async function getUsers() {
    const data = await db.query('SELECT * FROM users');
    return data.rows
}

export async function saveUser(name:string, email: string, password:string) {

    try{

        const userRows = await db.query('SELECT * FROM users WHERE name = $1', [name]);
        if(!userRows) {
            return 'Username is taken.'
        } else {
            await db.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
            console.log('SAVED USER');
            return 'Saved successfully!';
        }
        
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}