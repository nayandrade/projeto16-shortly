import jwt from 'jsonwebtoken';

export default function verifyJwt(req, res, next) {
    const SECRET_KEY = process.env.JWT_SECRET;
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer', '').trim();
    console.log(req.headers, token)

    if(!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if(err) {
            return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' })
        }
        req.user = decoded;
        next();    
    })
}