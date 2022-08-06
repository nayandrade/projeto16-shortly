import { signinSchema } from '../schemas/signinSchema.js';

export default function verifySignin(req, res, next){
    const body = req.body;
    const isValid = signinSchema(body);

    if(isValid.error){
        return res.status(422).send(isValid.error.details.map(detail => detail.message.replace(/["]/g, '')));  
    }

    next();
}