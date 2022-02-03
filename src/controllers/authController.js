import { stripHtml } from "string-strip-html";
import db from "../db.js";
import newUserScheme from "../schemes/newUserScheme.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
    const user = req.body;
    const validate = newUserScheme.validate(user);
    if(validate.error) return res.status(422).send(validate.error);
    
    try {
        const alreadyRegistered = await db.collection("users").findOne({email: user.email});
        if(alreadyRegistered) return res.status(409).send("E-mail já cadastrado");
        
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