import { Application, Request, Response } from "express";
import { TransactionController } from "../controllers/transaction.controller";

export class TransactionRoutes {
  private transactionController: TransactionController = new TransactionController();

  public route(app: Application) {
    // Create e new transaction with user
    app.post("/api/transaction", (req: Request, res: Response) => {
      this.transactionController.createTransaction(req, res);
    });

    // Get history transactions for all users
    app.get("/api/transactions", (req: Request, res: Response) => {
      this.transactionController.getAllTransactions(req, res);
    });

    // Get history transaction by user
    app.get("/api/transaction/:id", (req: Request, res: Response) => {
      this.transactionController.getTransactionByUserId(req, res);
    });

    // Update transaction and can change linked user of a transaction to another user
    app.put("/api/transaction/:id", (req: Request, res: Response) => {
      this.transactionController.updateTransaction(req, res);
    });

    // Delete a transaction
    app.delete("/api/transaction/:id", (req: Request, res: Response) => {
      this.transactionController.deleteTransaction(req, res);
    });
  }
}
