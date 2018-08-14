import mongoose from "mongoose";

const journalTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

journalTypeSchema.set("toJSON", { virtuals: true });

export const JournalType = mongoose.model("JournalType", journalTypeSchema);
