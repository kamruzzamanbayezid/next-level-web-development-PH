import { Role } from "../../enums/user.enum";

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
