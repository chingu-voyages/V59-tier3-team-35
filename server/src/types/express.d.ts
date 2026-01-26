import { Account } from '@prisma/client';

declare global {
    namespace Express {
        interface User extends Account { }
        interface Request {
            user: User;
        }
    }
}
