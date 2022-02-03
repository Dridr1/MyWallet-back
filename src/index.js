import express from "express";
import cors from "cors";
import { signUp } from "./controllers/authController.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);


app.listen(5000, () => {
    console.log("|--------------------------------------------------------------------|");
    console.log("| Welcome to MyWallet :) API is running at http://localhost:5000/ |");
    console.log("|--------------------------------------------------------------------|");
});