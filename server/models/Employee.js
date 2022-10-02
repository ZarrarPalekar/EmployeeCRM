import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
    },
    image: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Employee", employeeSchema);
