import mongoose from 'mongoose'

const { Schema } = mongoose

const TodoScheme = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  statusId: { type: Number, required: true },
  properties: [String],
  // creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  creator: { type: String, required: true },
})

const TodoModel = mongoose.model('Todos', TodoScheme, 'todos')

export default TodoModel
