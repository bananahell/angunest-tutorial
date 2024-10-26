import { User } from './user.interface';

export interface Comment {
  content: string;
  parent: Comment | null;
  user: User;
  _id: string;
}
