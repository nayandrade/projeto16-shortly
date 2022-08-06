import joi from "joi";

export default function urlSchema(object){
    const validationSchema = joi.object({
        url: joi.string().uri(),
    })

    const validation = validationSchema.validate(object, {abortEarly: false});
    return validation;
}