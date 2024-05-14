'use server'
import { db } from './db';

export async function getData() {
    const data = await db.query('SELECT * FROM projects');
    return data.rows
}

export async function saveData(name:string, timespent:number, user_id:number) {
    timespent = timespent * 3600;
    try{
        await db.query('INSERT INTO projects(name) VALUES ($1, $2)', [name, user_id]);
        return 'Saved successfully!';
        
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}

export async function updateData(proj_id:number, categ_id: number, timespent: number) {
    try{
        await db.query('INSERT INTO work_logs (project_id, category_id, timespent) VALUES ($1, $2, $3)', [proj_id, categ_id, timespent])
        return 'Work log has been saved.'
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}

export async function deleteData(id: number) {
    try{
        console.log(id);
        
        await db.query('DELETE FROM projects WHERE id = $1', [id])
        return 'Project has been deleted'
    } catch (error) {
        console.log('error:' + error);
        return 'Something went wrong ...'
    }
}

export async function getPrevious(id: number) {
    const sql = 'SELECT SUM (timespent) AS sum FROM work_logs WHERE project_id = $1'
    const result = await db.query(sql, [id]);
    
    return Number(result.rows[0].sum);
}

export async function getProj(id: number) {
    const data = await db.query('SELECT * FROM projects WHERE id=$1', [id]);
    return data.rows
}

export async function getAll() {
    const data = await db.query('SELECT projects.id AS ProjectId, projects.name AS ProjectName, COALESCE(SUM(work_logs.timespent), 0) AS TotalTimeSpent FROM projects LEFT JOIN work_logs ON projects.id = work_logs.project_id GROUP BY projects.id, projects.name');
    return data.rows
}

export async function getCateg(id: number) {
    const data = await db.query('SELECT * FROM categories WHERE id=$1', [id]);
    console.log(data.rows);
    
    return data.rows
}

export async function getWorkLoad(id: number) {
    const data = await db.query('SELECT c.name, SUM(wl.timespent) AS sum FROM work_logs wl JOIN categories c ON wl.category_id = c.id WHERE wl.project_id=$1 GROUP BY c.name, wl.category_id;', [id]);

    return data.rows
}

