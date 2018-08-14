import { Model, Document } from "mongoose";

interface IAccountDocument extends Document {
  name: string;
}

interface IAccount extends IAccountDocument {
  //   comparePassword(password: string): boolean;
}

export interface IAccountModel extends Model<IAccount> {
  // hashPassword(password: string): boolean;
}
