import mongoose from 'mongoose'

const { Schema } = mongoose

const TodoScheme = new Schema({
  name: String,
})

const TodoModel = mongoose.model('Todos', TodoScheme, 'todos')

export default TodoModel
