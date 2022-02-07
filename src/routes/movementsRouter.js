import { Router } from "express";
import { deleteMovement, getMovements, newMovement, updateMovement } from "../controllers/movementController.js";
import { verifyTokenMiddleware } from "../middlewares/verifyTokenMiddleware.js";
import { validateNewMovementMiddleware } from "../middlewares/validateNewMovementMiddleware.js";
const movementsRouter = Router();

movementsRouter.post('/movements', verifyTokenMiddleware, validateNewMovementMiddleware, newMovement);
movementsRouter.get('/movements', verifyTokenMiddleware, getMovements);
movementsRouter.delete("/movements", verifyTokenMiddleware, deleteMovement);
movementsRouter.put("/movements", verifyTokenMiddleware, validateNewMovementMiddleware,updateMovement);
export default movementsRouter;
