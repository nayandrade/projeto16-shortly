import connection from '../database/database.js';

export async function getLinkByUrl(url) {
    return await connection.query(`
    SELECT links.id, links.url, links."shortUrl"
    FROM links
    WHERE url = $1
    `, [url]);
}

export async function getLinkById(id) {
    return await connection.query(`
    SELECT links.id, links.url, links."shortUrl"
    FROM links
    WHERE id = $1
    `,[id]);
}

export async function getLinkToValidateById(id) {
    return await connection.query(`
    SELECT *
    FROM links
    WHERE id = $1
    `,[id]);
}

export async function postLink(nanoUrl, url, userId) {
    return await connection.query(`
    INSERT INTO links ("shortUrl", "url", "userId") 
    VALUES ($1, $2, $3)
    `, [nanoUrl, url, userId]);
}

export async function getLinkByShortUrl(shortUrl) {
    return await connection.query(`
    SELECT * FROM links
    WHERE "shortUrl" = $1
    `, [shortUrl]);
}

export async function updateLinkCount(shortUrl) {
    return await connection.query(`
    UPDATE links
    SET "clicks" = "clicks" + 1
    WHERE "shortUrl" = $1
    `,[shortUrl]);
}

export async function deleteLink(id) {
    return await connection.query(`
    DELETE FROM links
    WHERE id = $1
    `,[id]);
}

const linksRepository = {
    getLinkByUrl,
    getLinkById,
    getLinkToValidateById,
    postLink,
    getLinkByShortUrl,
    updateLinkCount,
    deleteLink
}

export default linksRepository;