'use server'
import { db } from './db';

export async function getUsers() {
    const data = await db.query('SELECT * FROM users');
    return data.rows
}

export async function saveUser(username:string, email: string, password:string) {

    try{
        await db.query('INSERT INTO users(username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
        console.log('SAVE USER');
        

        return 'Saved successfully!';
        
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}