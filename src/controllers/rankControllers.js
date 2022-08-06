import connection from "../database/database.js";

export default async function getRanking(req, res) {
    try {
        const { rows: ranking } = await connection.query(`
        SELECT users.id, users.name, COUNT(links.id) as "linksCount", COALESCE(SUM(links.clicks), 0) as "visitCount"
        FROM users 
        LEFT JOIN links ON links."userId" = users.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10
        `)
        res.status(200).send(ranking);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}