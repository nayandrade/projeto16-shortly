import connection from '../database/database.js';

export default async function getUserUrls(req, res) {
    const { id } = req.user;
    console.log(req.user)

    try {
        const { rows: validUser } = await connection.query(`
        SELECT users
        WHERE id = $1
        `,[id]);
        if(validUser.length < 1) {
            return res.status(404).send('User not found');
        }    

        const { rows: userData } = await connection.query(`
        SELECT users.id, users.name, SUM(links.clicks) as "visitCount"
        FROM users
        JOIN links ON links."userId" = users.id
        WHERE users.id = $1
        GROUP BY users.id
        `, [id]);

        const { rows: userUrls } = await connection.query(`
        SELECT id, "shortUrl", url, clicks AS "visitCount" 
        FROM links 
        WHERE "userId" = $1`, [id]);
        
        res.status(200).send({ ...userData[0], shortenedUrls: userUrls });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}