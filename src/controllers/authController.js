import { stripHtml } from "string-strip-html";
import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const signUp = async (req, res) => {
    const user = req.body;
    try {
        const alreadyRegistered = await db.collection("users").findOne({ email: user.email });
        if (alreadyRegistered) return res.status(409).send("E-mail já cadastrado");

        const userToBeStored = {
            email: stripHtml(user.email).result.trim(),
            name: stripHtml(user.name).result.trim(),
            password: bcrypt.hashSync(user.password, 10)
        }
        await db.collection("users").insertOne(userToBeStored);
        return res.sendStatus(201);
    } catch (error) {
        return res.send(error);
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.collection("users").findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            const session = {
                userID: user._id,
                token
            }
            await db.collection("sessions").insertOne(session);
            return res.send(token).status(200);
        } else {
            return res.status(401).send("E-mail ou senha incorretos");
        }
    } catch (error) {
        return res.send(error);
    }
}