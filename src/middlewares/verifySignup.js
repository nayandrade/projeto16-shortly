import signupSchema from "../schemas/signupSchema.js";

export default function verifySignup(req, res, next){
    const body = req.body;
    const isValid = signupSchema(body);

    if(isValid.error){
        return res.status(422).send(isValid.error.details.map(detail => detail.message.replace(/["]/g, '')));  
    }

    if (body.password !== body.confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    next();
}