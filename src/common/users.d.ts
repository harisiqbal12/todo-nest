import { User } from '@prisma/client';

export type JwtUser = Omit<User, 'updatedAt' | 'password' | 'imageURI'>;

type UserRes = Omit<User, 'updatedAt' | 'password' | 'id'>;
