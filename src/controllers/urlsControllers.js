import { nanoid } from 'nanoid';

import linksRepository from '../repositories/linksRepository.js';

export async function postShortenUrl(req, res) {
    const { url } = req.body;
    const nanoUrl = nanoid();
    const userId = req.user.id;
    console.log(url, nanoUrl, userId)

    try {
        // const { rows: validUrl } = await connection.query(`
        // SELECT * FROM links 
        // WHERE url = '${url.trim()}'
        // `,)

        const { rows: validUrl } = await linksRepository.getLinkByUrl(url.trim());
        console.log(validUrl)

        if(validUrl.length > 0) {
            return res.status(400).send('Url already exists');
        }

        // const { myUrl } = await connection.query(`
        // INSERT INTO links ("shortUrl", "url", "userId") 
        // VALUES ($1, $2, $3)
        // `, [nanoUrl, url, req.user.id]);

        const myUrl = await linksRepository.postLink(nanoUrl, url, userId);
        console.log(myUrl)
        if (myUrl.rowCount < 1) {
            return res.status(500).send(myUrl.command);
        }

        return res.status(200).send({shortUrl: nanoUrl});
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function getShortenUrlById(req, res) {
    const { id } = req.params;

    try {
        // const { rows: validUrl } = await connection.query(`
        // SELECT links.id, links.url, links."shortUrl"
        // FROM links
        // WHERE id = ${id}
        // `)

        const { rows: validUrl } = await linksRepository.getLinkById(id.trim());

        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }
        return res.status(200).send(validUrl[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function getOpenShortenUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        // const { rows: validUrl } = await connection.query(`
        // SELECT * FROM links
        // WHERE "shortUrl" = '${shortUrl}'
        // `)

        const { rows: validUrl } = await linksRepository.getLinkByShortUrl(shortUrl.trim());

        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }

        // await connection.query(`
        // UPDATE links
        // SET "clicks" = "clicks" + 1
        // WHERE "shortUrl" = '${shortUrl}'
        // `)
        await linksRepository.updateLinkCount(shortUrl.trim());

        return res.redirect(validUrl[0].url);

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function deleteShortenUrl(req, res) {
    const { id } = req.params;

    try {
        // const { rows: validUrl } = await connection.query(`
        // SELECT * FROM links
        // WHERE id = ${id}
        // `)

        const { rows: validUrl } = await linksRepository.getLinkToValidateById(id.trim());
        console.log(validUrl)

        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }

        if(validUrl[0].userId !== req.user.id) {
            console.log(validUrl[0].userId, req.user.id)
            return res.status(401).send('You are not authorized to delete this url');
        }

        // await connection.query(`
        // DELETE FROM links
        // WHERE id = ${id}
        // `)
        await linksRepository.deleteLink(id.trim());

        return res.status(200).send('Url deleted successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}