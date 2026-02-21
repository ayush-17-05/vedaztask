import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: String,
  slots: [String],
});

const expertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    experience: { type: Number, required: true },
    rating: { type: Number, required: true },
    availableSlots: [slotSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Expert", expertSchema);
