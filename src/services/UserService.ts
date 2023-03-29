import UserModel, { IUser } from '@/models/User'
import { UserRepository } from '@/repositories/UserRepository'
import { Service } from 'typedi'

@Service()
export class UserService {
  protected readonly repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async login(): Promise<IUser> {
    return this.repository.login()
  }

  async register(body: IUser): Promise<IUser> {
    const { name, email, password, image } = body

    const newUser = new UserModel({
      name,
      email,
      password,
      image,
    })

    return this.repository.register(newUser)
  }
}

export default UserService

// example user
// {
//   "name": "ChinhLT",
//   "email": "trungchinh211199@gmail.com",
//   "password": "bingokub12",
//   "todos": ["u1", "u2"]
// }
