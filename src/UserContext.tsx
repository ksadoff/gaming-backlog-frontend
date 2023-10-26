// UserContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of your user context
interface UserContextProps {
  userId: string;
  setUserId: (id: string) => void;
}

// Create the context with an initial value of undefined
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a custom hook to use the context
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Create a provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [userId, setUserId] = useState<string>('');

  // Provide the context value to its children
  const contextValue: UserContextProps = { userId, setUserId };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
