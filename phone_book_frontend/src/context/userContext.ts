import { createContext } from 'react';
import { User } from '../types';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
