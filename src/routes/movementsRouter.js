import { Router } from "express";
import { getMovements, newMovement } from "../controllers/movementController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";

const movementsRouter = Router();

movementsRouter.post('/movements', verifyTokenMiddleware, newMovement);
movementsRouter.get('/movements', verifyTokenMiddleware, getMovements);

export default movementsRouter;
