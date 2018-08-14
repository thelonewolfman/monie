import mongoose from "mongoose";

import { IAccountModel } from "../interfaces/account";

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true, default: true },
  type: {
    type: String,
    required: true,
    enum: ["asset", "liability", "equity", "revenue", "expense"]
  }
});

accountSchema.set("toJSON", { virtuals: true });

export const Account: IAccountModel = mongoose.model("Account", accountSchema);
