import _ from "lodash";
import { RequestHandler } from "express";

import { JournalType } from "../models";
// import { validateReq } from "../validations";

const readAll: RequestHandler = async (req, res) => {
  const { page = 1, limit = 10, sort, order, ...rest } = req.query;

  //   const error = validateReq(rest, "query");
  //   if (error) return res.status(400).send(error.details[0].message);

  try {
    const [count, docs] = await Promise.all([
      JournalType.find(rest).countDocuments(),
      JournalType.find(rest)
        .skip((page - 1) * limit)
        .limit(+limit)
        .sort({ [sort]: order === "ASC" ? 1 : -1 })
      // .select("-password")
    ]);

    res
      .header("X-Total-Count", count.toString())
      .status(200)
      .json(docs);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const createOne: RequestHandler = async (req, res) => {
  //   const error = validateReq(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  try {
    const doc = await new JournalType({ ...req.body }).save();
    res.send(doc);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const readOne: RequestHandler = async (req, res) => {
  try {
    const doc = await JournalType.findById(req.params.id);
    res.send(doc);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const updateOne: RequestHandler = async (req, res) => {
  //   const error = validateReq(req.body);
  //   if (error) return res.status(400).send(error.details[0].message);

  try {
    const doc = await JournalType.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.send(_.pick(doc, ["id", "username", "role"]));
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const deleteOne: RequestHandler = async (req, res) => {
  try {
    const doc = await JournalType.findByIdAndRemove(req.params.id);
    res.json(doc);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export default {
  readAll,
  createOne,
  readOne,
  updateOne,
  deleteOne
};
