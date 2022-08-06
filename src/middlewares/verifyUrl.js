import urlSchema from "../schemas/urlSchema.js";

export default function verifyUrl(req, res, next){
    const body = req.body;
    const isValid = urlSchema(body);

    if(isValid.error){
        return res.status(422).send(isValid.error.details.map(detail => detail.message.replace(/["]/g, '')));  
    }

    next();
}