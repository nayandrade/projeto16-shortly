import joi from "joi";

export function signinSchema(object){
    const validationSchema = joi.object({
        email: joi.string().email().required().trim(),
        password: joi.string().required()
    })

    const validation = validationSchema.validate(object, {abortEarly: false});
    return validation;
}