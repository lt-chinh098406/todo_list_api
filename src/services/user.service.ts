import UserModel from '@/models/user.models'

interface User {
  name: string
  email: string
  password: string
  image: string
  todos: string[]
}

interface UserService {
  login(): Promise<any>
  register<T extends User>(body: T): Promise<void>
}

const UserService: UserService = {
  async login() {
    return await UserModel.find({})
  },

  async register(body) {
    const { name, email, password, todos } = body

    const newUser = new UserModel({
      name,
      email,
      password,
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      todos,
    })

    try {
      // const existingUser = await newUser.findOne({ email: email })
      // if (existingUser) {
      //   console.log('User email exists already, please login instead.')
      //   return
      // }

      await newUser.save()
    } catch (e) {
      console.log(e)
    }
  },
}

export default UserService

// example user
// {
//   "name": "ChinhLT",
//   "email": "trungchinh211199@gmail.com",
//   "password": "bingokub12",
//   "todos": ["u1", "u2"]
// }
