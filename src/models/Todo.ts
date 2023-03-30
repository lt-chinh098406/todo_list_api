import mongoose, { model, Schema, Model, Document } from 'mongoose'

export interface ITodo extends Document {
  title: string
  description: string
  statusId: number
  properties: string[]
  creator: any
}

const TodoScheme: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  statusId: { type: Number, required: true },
  properties: [String],
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
})

const TodoModel: Model<ITodo> = model<ITodo>('Todos', TodoScheme)

export default TodoModel
