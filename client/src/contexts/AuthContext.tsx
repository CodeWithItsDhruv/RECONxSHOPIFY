import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as shopifyLogin, signup as shopifySignup, getMe, logout as shopifyLogout, Customer } from '@/lib/auth';

interface AuthContextType {
  user: Customer | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = 'shopify_customer_token';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Init - check for token
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          const customer = await getMe(token);
          if (customer) {
            setUser(customer);
          } else {
            localStorage.removeItem(TOKEN_KEY);
          }
        } catch (err) {
          localStorage.removeItem(TOKEN_KEY);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await shopifyLogin(email, password);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.token && result.user) {
        localStorage.setItem(TOKEN_KEY, result.token);
        setUser(result.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Splitting username into First/Last if possible, or just using as First Name
      const nameParts = username.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const result = await shopifySignup(email, password, firstName, lastName);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.token && result.user) {
        localStorage.setItem(TOKEN_KEY, result.token);
        setUser(result.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    shopifyLogout();
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const resetPassword = async (email: string): Promise<void> => {
    // Shopify Storefront API CustomerRecover mutation
    // For now, simpler implementation or could verify if specific mutation is needed.
    // The Master Prompt didn't explicitly demand recover, but we keep the signature valid.
    console.log("Password reset requested for", email);
    // TODO: Implement customerRecover mutation if strict requirement
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    resetPassword,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

