import { nanoid } from 'nanoid';
import linksRepository from '../repositories/linksRepository.js';

export async function postShortenUrl(req, res) {
    const { url } = req.body;
    const nanoUrl = nanoid(10);
    const userId = req.user.id;

    try {
        const { rows: validUrl } = await linksRepository.getLinkByUrl(url.trim());
        if(validUrl.length > 0) {
            return res.status(409).send('Url already exists');
        }

        const myUrl = await linksRepository.postLink(nanoUrl, url, userId);
        if (myUrl.rowCount < 1) {
            return res.status(500).send(myUrl.command);
        }

        return res.status(201).send({shortUrl: nanoUrl});
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function getShortenUrlById(req, res) {
    const { id } = req.params;

    try {
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
        const { rows: validUrl } = await linksRepository.getLinkByShortUrl(shortUrl.trim());
        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }

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
        const { rows: validUrl } = await linksRepository.getLinkToValidateById(id.trim());
        if(validUrl.length < 1) {
            return res.status(404).send('Url not found');
        }

        if(validUrl[0].userId !== req.user.id) {
            console.log(validUrl[0].userId, req.user.id)
            return res.status(401).send('You are not authorized to delete this url');
        }

        await linksRepository.deleteLink(id.trim());

        return res.status(204).send();

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}