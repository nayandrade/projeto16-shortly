import userRepository from '../repositories/userRepository.js';

export default async function getUserUrls(req, res) {
    const { id } = req.user;

    try {
        const { rows: validUser } = await userRepository.getUserById(id);

        if(validUser.length < 1) {
            return res.status(404).send('User not found');
        }
        
        const { rows: userData } = await userRepository.getUserData(id);

        const { rows: userUrls } = await userRepository.getUserUrls(id);
        
        res.status(200).send({ ...userData[0], shortenedUrls: userUrls });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}