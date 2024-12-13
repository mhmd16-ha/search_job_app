import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
  jobId: {
    type: Types.ObjectId,
    ref: "Job",
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  userTechSkills: [String],
  userSoftSkills: [String],
  userResume: String,
});

const Application = mongoose.model("Application", schema);
export default Application;
