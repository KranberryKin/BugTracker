import { Schema } from 'mongoose'

export const BugSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, required: true, max: 5, min: 1 },
    updatedAt: { type: Date, default: new Date() },
    closed: { type: Boolean, default: false },
    closedDate: { type: Date },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BugSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
