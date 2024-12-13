import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
  companyName: {
    type:String,
    unique:[true,"name is required"],
  },
  description: String,
  industry: String,
  address: String,
  numberOfEmployees: Number,
  companyEmail: {
    type:String,
    unique:[true,"email is required"],
  },
  companyHR: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Company = mongoose.model("Company", schema);
export default Company;
