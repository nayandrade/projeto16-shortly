import rankRepository from "../repositories/rankRepository.js";

export default async function getRanking(req, res) {
    try {
        const { rows: ranking } = await rankRepository.getUsersRanking();

        res.status(200).send(ranking);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}