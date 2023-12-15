// Importing only necessary functions from the Firebase auth module
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from '@/lib/firebase/config';
import LoadingComponent from '@/components/loading';

// Using the correct type for createContext
export const AuthContext = createContext<{ user: any }>({ user: null });

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(firebase_app);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); // Dependency array is empty because we only want this effect to run once

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <LoadingComponent /> : children}
    </AuthContext.Provider>
  );
};
