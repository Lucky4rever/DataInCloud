import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

router.post("/", UserController.createUser.bind(UserController));
router.get("/", UserController.getUsers.bind(UserController));
router.get("/:id", UserController.getUser.bind(UserController));
router.put("/:id", UserController.updateUser.bind(UserController));
router.delete("/:id", UserController.deleteUser.bind(UserController));

export default router;
