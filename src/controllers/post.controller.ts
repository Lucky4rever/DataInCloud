import { Request, Response } from "express";
import PostService from "../services/post.service";
import { validatePost } from "../middlewares/validation.middleware";

class PostController {
  private service: PostService;
  
  constructor(service: PostService) {
    this.service = service;
  }

  async createPost(req: Request, res: Response) {
    try {
      const { error } = validatePost(req.body);

      if (error !== null) {
        console.log(error);
        return res.status(400).send(error.details[0].message);
      }

      console.log(req.body);
      const post = await this.service.createPost(req.body);
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send("Invalid request");
    }
  }

  async getPosts(_: Request, res: Response) {
    try {
      const posts = await this.service.getPosts();
      res.status(200).send(posts);
    } catch (error) {
      res.status(404).send("Posts not found");
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const post = await this.service.getPost(parseInt(req.params.id!));
      if (!post) {
        res.status(404).send("Post not found");
        return;
      }

      res.send(post);
    } catch (error) {
      res.status(404).send("Post not found");
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const { error } = validatePost(req.body);

      if (error !== null) {
        return res.status(400).send(error.details[0].message);
      }

      const post = await this.service.updatePost(parseInt(req.params.id!), req.body);
      res.status(200).send(post);
    } catch (error) {
      res.status(404).send("Post not found");
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      await this.service.deletePost(parseInt(req.params.id!));
      res.status(204).send("Post deleted");
    } catch (error) {
      res.status(404).send("Post not found");
    }
  }
}

const postController = new PostController(new PostService());

export default postController;
