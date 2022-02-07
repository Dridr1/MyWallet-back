import joi from "joi";

const newUserSchema = joi.object({
    email: joi.string().email().required(),
    name: joi.string().required().alphanum().max(30),
    password: joi.string().required().min(6).max(30),
    repeat_password: joi.ref('password')
});

export default newUserSchema;