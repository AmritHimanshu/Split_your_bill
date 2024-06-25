import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const billSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  members: [
    {
      member: {
        name: {
          type: String,
          required: true,
        },
        totalSpends: {
          type: String,
          default: "0",
        },
      },
    },
  ],
  createdBy: {
    type: ObjectId,
    ref: "USER",
  },
});


const Bill = mongoose.model('BILL', billSchema);

module.exports = Bill;