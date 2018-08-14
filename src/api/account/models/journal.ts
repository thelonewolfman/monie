import mongoose from "mongoose";

import { Account, JournalType } from "../models";

const accountSchema = new mongoose.Schema({
  name: { type: String }
});

accountSchema.pre("save", async function(this: any, next) {
  try {
    const account = await Account.findOne({ _id: this._id, name: this.name });

    if (!account) throw new Error(`${this.name} account does not exist`);

    next();
  } catch (e) {
    next(e.message);
  }
});

const journalLineSchema = new mongoose.Schema({
  account: accountSchema,
  debit: {
    type: Number,
    min: 0,
    validate: {
      validator: function(v: any) {
        return v && !this.credit ? true : !v && this.credit ? true : false;
      }
    }
  },
  credit: {
    type: Number,
    min: 0,
    validate: {
      validator: function(v: any) {
        return v && !this.debit ? true : !v && this.debit ? true : false;
      }
    }
  }
  // date: { type: Date }
});

const journalTypeSchema = new mongoose.Schema({
  name: { type: String }
});

journalTypeSchema.pre("save", async function(this: any, next) {
  try {
    const type = await JournalType.findOne({ _id: this._id, name: this.name });

    if (!type) throw new Error(`${this.name} does not exist`);

    next();
  } catch (e) {
    next(e);
  }
});

const journalSchema = new mongoose.Schema({
  journalType: journalTypeSchema,
  journalLines: [journalLineSchema]
});

journalSchema.set("toJSON", { virtuals: true });
journalSchema.set("timestamps", true);

export const Journal = mongoose.model("Journal", journalSchema);
