import joi from "joi";

const movementSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().min(0).required(),
    type: joi.string().required()
});

export default movementSchema;