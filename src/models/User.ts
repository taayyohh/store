import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
  role: string
}

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
})

// Check if the model is already registered
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
