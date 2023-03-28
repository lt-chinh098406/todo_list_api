const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  // todos: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Todos' }],
  todos: [String],
})

const UserModel = mongoose.model('User', UserSchema, 'user')

export default UserModel
