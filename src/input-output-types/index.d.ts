import { Express, Request } from 'express'

declare global {
  namespace Express {
    export interface Request{
      userId: any
    }
  }
}