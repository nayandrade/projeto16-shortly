import joi from "joi";

export default function signupSchema(object){
    const validationSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required().trim(),
        password: joi.string().required(),
        confirmPassword: joi.string().required(),
    })

    const validation = validationSchema.validate(object, {abortEarly: false});
    return validation;
}