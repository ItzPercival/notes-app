import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getNotes() {
    const [row] = await pool.query("SELECT * FROM notes");
    return row
}

export async function getId(id) {
    const row = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);
    return row
}

export async function deleteItem(id) {
    // console.log(id)
    const deleted = await pool.query("DELETE FROM notes WHERE id = ?", [id])
    return deleted;
}

export async function createNote(title, contents) {
    if(title == '' || contents == ''){
        return null;
    }
    const [added] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES
    (?, ?)
    `, [title, contents]);
    return added;
}

export async function updateNote(title, contents, id){
    const updatedData = await pool.query("UPDATE notes SET title = ?, contents = ? WHERE id = ?", [title, contents, id])
    return updatedData;
}

