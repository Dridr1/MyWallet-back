import db from "../db.js";

export const verifyTokenMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth?.replace("Bearer", "");
    if (!token) return res.sendStatus(401);

    const session = await db.collection("sessions").findOne({token: token.trim()});
    if(!session) return res.sendStatus(401);

    const user = await db.collection("users").findOne({_id: session.userID});
    if(!user) return res.sendStatus(401);

    delete user.password;
    res.locals.user = user;
    next();
}