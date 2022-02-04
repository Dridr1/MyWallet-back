import { stripHtml } from "string-strip-html";
import db from "../db.js";

const newMovement = async (req, res) => {
    const user = res.locals.user;
    try {
        const sanitizedDescription = stripHtml(req.body.description).result.trim();
        const movement = { ...req.body, description: sanitizedDescription, userID: user._id };
        await db.collection("movements").insertOne(movement);
        return res.sendStatus(201);
    } catch (error) {
        return res.send(error);
    }
};

const getMovements = async (req, res) => {
    const user = res.locals.user;
    try {
        const movements = await db.collection("movements").find({ userID: user._id }).toArray();
        let balance = 0;
        for (const move of movements) {
            if (move.type === 'entry') balance += parseFloat(move.value);
            else if (move.type === 'exit') balance -= parseFloat(move.value);
        };
        return res.status(200).send({ balance, movements });
    } catch (error) {
        return res.send(error);
    }
}

export {
    newMovement,
    getMovements
} 