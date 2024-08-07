import { IUser } from '../models/user';

// Extend the express.js request type
// This will allow us to handle the authMiddleware in the requests
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser; 
  }
}
