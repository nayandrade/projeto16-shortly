import connection from '../database/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function getUserByEmail(email) {
    return await connection.query(`
    SELECT * FROM users 
    WHERE email = $1`, [email.trim()]);
}

// async function getUserById(id) {
//     const { rows: validUser } = await connection.query(`
//     SELECT * FROM users 
//     WHERE id = $1`, [id]);

//     return validUser[0];
// }


const userRepository = {
    getUserByEmail
}

export default userRepository;