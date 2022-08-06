import connection from '../database/database.js';

export async function getUserByEmail(email) {
    return await connection.query(`
    SELECT * FROM users 
    WHERE email = $1`, [email]);
}

export async function insertUser(name, email, encryptKey) {
    return await connection.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    `, [name, email, encryptKey]);
}

const userRepository = {
    getUserByEmail,
    insertUser
}

export default userRepository;