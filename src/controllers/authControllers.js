import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function signUp(req, res) {
    const { name, email, password } = req.body;
    const encryptKey = bcrypt.hashSync(password, 10);

    try {
        const { rows: validUser } = await userRepository.getUserByEmail(email.trim());

        if(validUser.length > 0) {
            return res.status(400).send('User already exists');
        }

        await userRepository.insertUser(name, email, encryptKey);

        return res.status(200).send('User created successfully');
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
    const SECRET_KEY = process.env.JWT_SECRET;
    
    try {
        const { rows: validUser } = await userRepository.getUserByEmail(email.trim());

        const isValidPssword = bcrypt.compareSync(password, validUser[0].password);
        
        if(validUser.length < 1 || !isValidPssword) {
            return res.status(401).send('Invalid email or password.') 
        }

        const token = jwt.sign(validUser[0], SECRET_KEY, {
            expiresIn: 900 // expires in 15 minutes
        });

        res.status(200).json({auth: true, token: token});

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}