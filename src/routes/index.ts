import { Router } from "express";
import userRouter from "./user.routes";
import postRouter from "./post.routes";

class AppRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.router.use("/users", userRouter);
    this.router.use("/posts", postRouter);

    this.router.get("/", (_, res) => {
      res.send("Welcome to the API");
    });
  }
}

export default () => new AppRouter().router;
