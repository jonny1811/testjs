import * as mongoose from "mongoose";
import { ModificationNote } from "../common/model";

const Schema = mongoose.Schema;

const schema = new Schema({
  type: String,
  cashAmount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  modification_notes: [ModificationNote],
});

export default mongoose.model('Transactions', schema);