import connection from '../database/database.js';
import { nanoid } from 'nanoid';

export async function postShortenUrl(req, res) {
    const { url } = req.body;
    const nanoUrl = nanoid();
    console.log(url, nanoUrl, req.user)

    try {
        const { rows: validUrl } = await connection.query(`
        SELECT * FROM links 
        WHERE url = '${url.trim()}'
        `,)

        if(validUrl.length > 0) {
            return res.status(400).send('Url already exists');
        }

        await connection.query(`
        INSERT INTO links ("shortUrl", "url", "userId") 
        VALUES ($1, $2, $3)
        `, [nanoUrl, url, req.user.id]);
        return res.status(200).send({shortUrl: nanoUrl});
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getShortenUrlById(req, res) {
    const { id } = req.params;

    try {
        const { rows: validUrl } = await connection.query(`
        SELECT links.id, links.url, links."shortUrl"
        FROM links
        WHERE id = ${id}
        `)

        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }
        return res.status(200).send(validUrl[0]);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function getOpenShortenUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const { rows: validUrl } = await connection.query(`
        SELECT * FROM links
        WHERE "shortUrl" = '${shortUrl}'
        `)

        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }

        await connection.query(`
        UPDATE links
        SET "clicks" = "clicks" + 1
        WHERE "shortUrl" = '${shortUrl}'
        `)

        return res.redirect(validUrl[0].url);

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export async function deleteShortenUrl(req, res) {
    const { id } = req.params;

    try {
        const { rows: validUrl } = await connection.query(`
        SELECT * FROM links
        WHERE id = ${id}
        `)

        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }

        if(validUrl[0].userId !== req.user.id) {
            return res.status(401).send('You are not authorized to delete this url');
        }

        await connection.query(`
        DELETE FROM links
        WHERE id = ${id}
        `)

        return res.status(200).send('Url deleted successfully');

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}