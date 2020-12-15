import { ITransaction } from "./model";
import Transactions from "./schema";

export default class UserService {
  
  public async createTransaction(transactionParams: ITransaction, callback: any) {
    const _session = new Transactions(transactionParams);
    await _session.save(callback);
  }

  public async getAllTransactions(callback: any) {
    await Transactions.find({}, { __v: false }, null, async (err, transaction) => {
      if (err) {
        callback({ message: 'Something went wrong', err }, null);
      } else if (!transaction) {
        callback({ message: 'No find transactions' }, null);
      } else if (transaction) {
        transaction = await Transactions.populate(transaction, {
          path: 'user',
          model: 'Users',
          select: '_id name email'
        })
        callback(null, transaction);
      }
    });
  }

  public async filterTransactions(query: any, callback: any) {
    await Transactions.find(query, { __v: false }, callback);
  }

  public async updateTransactions(TransactionParams: ITransaction, callback: any) {
    const query = { _id: TransactionParams._id };
    await Transactions.findOneAndUpdate(query, TransactionParams, callback);
  }

  public async deleteTransactions(_id: String, callback: any) {
    const query = { _id: _id };
    await Transactions.deleteOne(query, callback);
  }
}
