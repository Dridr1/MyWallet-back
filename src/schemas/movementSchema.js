import joi from "joi";

const movementSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().required(),
    type: joi.string().required()
});

export default movementSchema;