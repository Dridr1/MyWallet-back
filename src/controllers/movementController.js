import { stripHtml } from "string-strip-html";
import db from "../db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export const newMovement = async (req, res) => {
    const user = res.locals.user;
    try {
        const sanitizedDescription = stripHtml(req.body.description).result.trim();
        const movement = { ...req.body, date: dayjs().format('DD/MM'), description: sanitizedDescription, userID: user._id };
        await db.collection("movements").insertOne(movement);
        return res.sendStatus(201);
    } catch (error) {
        return res.send(error);
    }
};

export const getMovements = async (req, res) => {
    const user = res.locals.user;
    try {
        const movements = await db.collection("movements").find({ userID: user._id }).toArray();
        let balance = 0;
        for (const move of movements) {
            if (move.type === 'entry') balance += parseFloat(move.value);
            else if (move.type === 'exit') balance -= parseFloat(move.value);
        };
        return res.status(200).send({ name: user.name, balance, movements: [...movements] });
    } catch (error) {
        return res.send(error);
    }
}

export const deleteMovement = async (req, res) => {
    const userID = new ObjectId(res.locals.user._id);
    const id = new ObjectId(req.query.id);
    try {
        const movement = await db.collection("movements").findOne({ _id: id });
        if (!movement) return res.sendStatus(401);
        if (userID.toString() !== movement.userID.toString()) return res.sendStatus(401);
        await db.collection("movements").deleteOne({ _id: id });
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).send(error);
    }
}

export const updateMovement = async (req, res) => {
    const userID = new ObjectId(res.locals.user._id);
    const id = new ObjectId(req.query.id);
    try {
        const movement = await db.collection("movements").findOne({ _id: id });
        if (!movement) return res.sendStatus(401);
        if (userID.toString() !== movement.userID.toString()) return res.sendStatus(401);
        await db.collection("movements").updateOne({ _id: id }, { $set: { ...movement, description: req.body.description, value: req.body.value } });
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).send(error);
    }
}