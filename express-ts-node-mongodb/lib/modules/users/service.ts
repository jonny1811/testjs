import { IUser } from "./model";
import users from "./schema";

export default class UserService {
  public async createUser(user_params: IUser, callback: any) {
    const _session = new users(user_params);
    await _session.save(callback);
  }

  public async getAllUsers(callback: any) {
    await users.find({}, { __v: false }, null, callback);
  }

  public async filterUser(query: any, callback: any) {
    await users.findOne(query, callback);
  }

  public async updateUser(user_params: IUser, callback: any) {
    const query = { _id: user_params._id };
    await users.findOneAndUpdate(query, user_params, callback);
  }

  public async deleteUser(_id: String, callback: any) {
    const query = { _id: _id };
    await users.deleteOne(query, callback);
  }
}
