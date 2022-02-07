import movementSchema from '../schemas/movementSchema.js';

export const validateNewMovementMiddleware = (req, res, next) => {
    const movement = req.body;
    const validate = movementSchema.validate(movement);
    if (validate.error) return res.status(422).send(validate.error);
    next();
}