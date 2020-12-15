import { Request, Response } from "express";
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from "../modules/common/service";
import { ITransaction } from "../modules/transactions/model";
import TransactionService from "../modules/transactions/service";

export class TransactionController {
  private transactionService: TransactionService = new TransactionService();

  public createTransaction(req: Request, res: Response) {
    // this check whether all the filds were send through the erquest or not
    if (
      req.body.type &&
      req.body.cashAmount &&
      req.body.user
    ) {
      const transactionParams: ITransaction = {
        type: req.body.type,
        cashAmount: req.body.cashAmount,
        user: req.body.user,
        modification_notes: [
          {
            modified_on: new Date(Date.now()),
            modified_by: null,
            modification_note: "New transaction created",
          },
        ],
      };

      this.transactionService.createTransaction(
        transactionParams,
        (err: any, transactionData: ITransaction) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("Create transaction successfull", transactionData, res);
          }
        }
      );
    } else {
      // error response if some fields are missing in request body
      insufficientParameters(res);
    }
  }

  /**
   * Method get transactions with a user
   * @param req 
   * @param res 
   */
  public async getAllTransactions(req: Request, res: Response) {
    await this.transactionService.getAllTransactions((err: any, transactionsData: ITransaction) => {
      if (err) {
        mongoError(err, res);
      } else {
        successResponse('Get history transactions from all Users', transactionsData, res);
      }
    })
  }

  public getTransactionByUserId(req: Request, res: Response) {
    if (req.params.id) {
      const transactionFilter = { user: req.params.id };
      this.transactionService.filterTransactions(
        transactionFilter,
        (err: any, transactionData: ITransaction) => {
          if (err) {
            mongoError(err, res);
          } else {
            successResponse("Get transactions history by User", transactionData, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public updateTransaction(req: Request, res: Response) {
    if (
      (req.params.id && req.body.type) ||
      req.body.cashAmount ||
      req.body.user
    ) {
      const TransactionFilter = { _id: req.params.id };
      this.transactionService.filterTransactions(
        TransactionFilter,
        (err: any, transactionData: ITransaction) => {
          if (err) {
            mongoError(err, res);
          } else if (transactionData) {
            transactionData[0].modification_notes.push({
              modified_on: new Date(Date.now()),
              modified_by: null,
              modification_note: "Transaction Data Updated",
            });
            const transactionParams: ITransaction = {
              _id: req.params.id,
              type: req.body.type ? req.body.type : transactionData[0].type,
              cashAmount: req.body.cashAmount ? req.body.cashAmount : transactionData[0].cashAmount,
              user: req.body.user ? req.body.user : transactionData[0].user,
              is_deleted: req.body.is_deleted ? req.body.is_deleted : transactionData[0].is_deleted,
              modification_notes: transactionData[0].modification_notes,
            };
            this.transactionService.updateTransactions(transactionParams, (err: any) => {
              if (err) {
                mongoError(err, res);
              } else {
                successResponse("Update transaction successfull", null, res);
              }
            });
          } else {
            failureResponse("Invalid transaction", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }

  public deleteTransaction(req: Request, res: Response) {
    if (req.params.id) {
      this.transactionService.deleteTransactions(
        req.params.id,
        (err: any, deleteDetails) => {
          if (err) {
            mongoError(err, res);
          } else if (deleteDetails.deletedCount !== 0) {
            successResponse("Delete transaction successfull", null, res);
          } else {
            failureResponse("Invalid transaction", null, res);
          }
        }
      );
    } else {
      insufficientParameters(res);
    }
  }
}
