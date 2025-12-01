import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  userName: string;
  password: string;
};

// Sample user data
const users: User[] = [
  { userId: 1, userName: 'emma', password: 'password123' },
  { userId: 2, userName: 'john', password: 'my-password' },
];

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/require-await
  async findUserByName(userName: string): Promise<User | undefined> {
    return users.find((user: User) => user.userName === userName);
  }
}
