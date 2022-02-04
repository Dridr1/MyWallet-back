import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import movementsRouter from "./routes/movementsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(movementsRouter)

app.listen(5000, () => {
    console.log("|---------------------------------------------------------------|");
    console.log("| Welcome to MyWallet! API is running at http://localhost:5000/ |");
    console.log("|---------------------------------------------------------------|");
});