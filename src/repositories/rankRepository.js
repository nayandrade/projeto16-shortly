import connection from "../database/database.js";

async function getUsersRanking() {
    return await connection.query(`
    SELECT users.id, users.name, COUNT(links.id) as "linksCount", COALESCE(SUM(links.clicks), 0) as "visitCount"
    FROM users 
    LEFT JOIN links ON links."userId" = users.id
    GROUP BY users.id
    ORDER BY "visitCount" DESC
    LIMIT 10
    `)
}

const rankRepository = {
    getUsersRanking
}

export default rankRepository;