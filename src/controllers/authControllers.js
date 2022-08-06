import connection from '../database/database.js';
import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken';

export async function signUp(req, res) {
    const { name, email, password } = req.body;
    const encryptKey = bcrypt.hashSync(password, 10);

    try {
        const { rows: validUser } = await connection.query(`
        SELECT * FROM users 
        WHERE email = $1
        `,[email.trim()]);

        if(validUser.length > 0) {
            return res.status(400).send('User already exists');
        }

        await connection.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)
        `, [name, email, encryptKey]);

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
        const { rows: validUser } = await connection.query(`
        SELECT * FROM users 
        WHERE email = $1`, [email.trim()]);

        const isValidPssword = bcrypt.compareSync(password, validUser[0].password);
        
        if(validUser.length < 1 || !isValidPssword) {
            return res.status(401).send('Invalid email or password.') 
        }

        const token = jwt.sign(validUser[0], SECRET_KEY, {
            expiresIn: 300 // expires in 5min
        });

        res.status(200).json({auth: true, token: token});  // send the jwt token to the client 

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}