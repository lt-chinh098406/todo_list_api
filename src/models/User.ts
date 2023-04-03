import mongoose, { model, Schema, Model, Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { ITodo } from '@/models/Todo'

export interface IUser extends Document {
  username: string
  email: string
  hash_password: number
  comparePassword(password: string): boolean
  image: string[]
  todos: ITodo[]
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash_password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  todos: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Todos' }],
})

UserSchema.methods.comparePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.hash_password)
}

const User: Model<IUser> = model<IUser>('User', UserSchema)

export default User
