import { Service } from 'typedi'
import UserModel, { IUser } from '@/models/User'

@Service()
export class UserRepository {
  async register(newTodo: IUser): Promise<IUser> {
    return await newTodo.save()
  }

  async login(): Promise<IUser> {
    return await UserModel.findOne()
  }
}
