import * as mongoose from "mongoose";
import { ModificationNote } from "../common/model";

export interface ITransaction {
  _id?: String;
  type: String;
  cashAmount: Number;
  user: mongoose.Schema.Types.ObjectId | string;
  is_deleted?: Boolean;
  modification_notes: ModificationNote[];
}