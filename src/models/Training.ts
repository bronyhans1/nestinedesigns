import mongoose, { Schema, model, models } from 'mongoose';

const trainingSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    message: { type: String, required: false },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'contacted', 'enrolled', 'rejected'],
    },
  },
  { timestamps: true }
);

const Training = models.Training ?? model('Training', trainingSchema);

export default Training;
