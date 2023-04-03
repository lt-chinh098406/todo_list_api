import { Service } from 'typedi'
import User, { IUser } from '@/models/User'
import bcrypt from 'bcrypt'

@Service()
export class UserRepository {
  async me(userId: string): Promise<IUser> {
    return await User.findById(userId)
  }
}
