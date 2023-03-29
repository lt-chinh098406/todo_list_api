import mongoose, { model, Schema, Model, Document } from 'mongoose'

import { ITodo } from '@/models/Todo'

export interface IUser extends Document {
  name: string
  email: string
  password: number
  image: string[]
  todos: ITodo[]
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  todos: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Todos' }],
})

const UserModel: Model<IUser> = model<IUser>('User', UserSchema)

export default UserModel
