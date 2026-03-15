import { Schema, model, models } from 'mongoose';

const applicationSchema = new Schema(
  {
    applicantId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    programmeDuration: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianContact: { type: String, required: true },
    guardianAddress: { type: String, required: true },
    paymentReference: { type: String, required: true, unique: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    amountPaid: { type: Number, required: true },
  },
  { timestamps: true }
);

const Application =
  models.Application ?? model('Application', applicationSchema);

export default Application;

