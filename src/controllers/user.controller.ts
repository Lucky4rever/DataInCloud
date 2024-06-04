import { Request, Response } from "express";
import UserService from "../services/user.service";
import { validateUser } from "../middlewares/validation.middleware";

class UserController {
  private service: UserService;
  
  constructor(service: UserService) {
    this.service = service;
  }

  async createUser(req: Request, res: Response) {
    try {
      const { error } = validateUser(req.body);
      
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const user = await this.service.createUser(req.body);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send("User creation failed");
    }
  }

  async getUsers(_: Request, res: Response) {
    try {
      const users = await this.service.getUsers();
      res.send(users);
    } catch (error) {
      res.status(404).send("Users not found");
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.service.getUser(parseInt(req.params.id!));
      
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { error } = validateUser(req.body);
      
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const user = await this.service.updateUser(parseInt(req.params.id!), req.body);
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await this.service.deleteUser(parseInt(req.params.id!));
      res.status(204).send("User deleted");
    } catch (error) {
      res.status(404).send("User not found");
    }
  }
}

const userController = new UserController(new UserService());

export default userController;
