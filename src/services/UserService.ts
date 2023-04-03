import UserModel, { IUser } from '@/models/User'
import { UserRepository } from '@/repositories/UserRepository'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'

@Service()
export class UserService {
  protected readonly repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  login(body: IUser): {} {
    const accessToken = jwt.sign(body, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '1800s',
    })
    const refreshToken = jwt.sign(body, process.env.JWT_REFRESH_SECRET)

    return { accessToken, refreshToken }
  }

  refreshToken(refreshToken: string): {} {
    let accessToken
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (err, data: any) => {
        const accessToken = jwt.sign(
          { username: data.username },
          process.env.JWT_REFRESH_SECRET,
          {
            expiresIn: '1800s',
          }
        )
      }
    )

    return { accessToken, refreshToken }
  }

  async me(userId: string): Promise<IUser> {
    return this.repository.me(userId)
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
