import { Application, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {
  private userController: UserController = new UserController();

  public route(app: Application) {
    // Create a new user
    app.post("/api/user", (req: Request, res: Response) => {
      this.userController.createUser(req, res);
    });

    // Get all users
    app.get("/api/users", (req: Request, res: Response) => {
      this.userController.getAllUsers(req, res);
    });

    // Get one user document by ID
    app.get("/api/user/:id", (req: Request, res: Response) => {
      this.userController.getUserById(req, res);
    });

    // Update one user document by ID
    app.put("/api/user/:id", (req: Request, res: Response) => {
      this.userController.updateUser(req, res);
    });

    // Delete one user document
    app.delete("/api/user/:id", (req: Request, res: Response) => {
      this.userController.deleteUser(req, res);
    });
  }
}
