import newUserSchema from "../schemas/newUserSchema.js";

export const validateNewUserMiddleware = (req, res, next) => {
    const user = req.body;
    const validate = newUserSchema.validate(user);
    if (validate.error) return res.status(422).send(validate.error);
    next();
}