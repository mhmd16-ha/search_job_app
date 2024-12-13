import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
  jobTitle: String,
  jobLocation: String,
  workingTime: String,
  seniorityLevel: {
    type: String,
    enum: ["Junior", "MidLevel", "Senior", "eam-Lead", "CTO"],
  },
  jobDescription: String,
  technicalSkills: [String],
  softSkills: [String],
  addedBy: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Job = mongoose.model("Job", schema);
export default Job;
