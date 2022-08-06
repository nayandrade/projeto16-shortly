import connection from '../database/database.js';

async function getUserByEmail(email) {
    return await connection.query(`
    SELECT * FROM users 
    WHERE email = $1`, [email]);
}

async function insertUser(name, email, encryptKey) {
    return await connection.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    `, [name, email, encryptKey]);
}

async function getUserById(id) {
    return await connection.query(`
    SELECT * 
    FROM users
    WHERE id = $1
    `,[id]);
}

async function getUserData(id) {
    return await connection.query(`
    SELECT users.id, users.name, SUM(links.clicks) as "visitCount"
    FROM users
    JOIN links ON links."userId" = users.id
    WHERE users.id = $1
    GROUP BY users.id
    `, [id]);
}

async function getUserUrls(id) {
    return await connection.query(`
    SELECT id, "shortUrl", url, clicks AS "visitCount" 
    FROM links 
    WHERE "userId" = $1
    `, [id]);
}

const userRepository = {
    getUserByEmail,
    insertUser,
    getUserById,
    getUserData,
    getUserUrls
}

export default userRepository;