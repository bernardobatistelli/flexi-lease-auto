import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1]
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.body.user = decoded
    console.log(req.body.user)
  } catch (error) {
    console.log(error)
  }
}
