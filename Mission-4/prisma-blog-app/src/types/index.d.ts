import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        email: string;
        emailVerified: boolean;
        name: string;
        role: string;
      };
    }
  }
}

