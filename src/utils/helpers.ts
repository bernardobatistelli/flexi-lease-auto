import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'

dotenv.config()
const { JWT_SECRET = '' } = process.env
export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12)
  }

  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword)
  }

  static generateToken(payload: string) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
  }
}
