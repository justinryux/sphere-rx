
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

// User types
export type UserRole = "pharmacy" | "centralfill" | null;

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organizationName: string;
  organizationId: string;
  centralFillConnections?: string[]; // For pharmacy users
  pharmacyConnections?: string[];    // For central fill users
  centralFillCode?: string;         // For central fill users
}

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  registerPharmacy: (data: PharmacyRegisterData) => Promise<boolean>;
  registerCentralFill: (data: CentralFillRegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface PharmacyRegisterData {
  email: string;
  password: string;
  name: string;
  organizationName: string;
  centralFillCode: string;
}

export interface CentralFillRegisterData {
  email: string;
  password: string;
  name: string;
  organizationName: string;
}

// Mock database for demo purposes
const MOCK_USERS: UserData[] = [
  {
    id: "1",
    email: "pharmacy@example.com",
    name: "John Pharmacy",
    role: "pharmacy",
    organizationName: "ABC Pharmacy",
    organizationId: "p-123",
    centralFillConnections: ["cf-456"]
  },
  {
    id: "2",
    email: "centralfill@example.com",
    name: "Jane CentralFill",
    role: "centralfill",
    organizationName: "XYZ Central Fill",
    organizationId: "cf-456",
    pharmacyConnections: ["p-123"],
    centralFillCode: "XYZ12345"
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("pharma_user");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data", error);
        localStorage.removeItem("pharma_user");
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (mock authentication)
      const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser) {
        toast({
          title: "Authentication Failed",
          description: "Invalid email or password",
          variant: "destructive"
        });
        return false;
      }
      
      // In a real app, you would validate password against hashed version
      
      // Save user to state and localStorage
      setUser(foundUser);
      localStorage.setItem("pharma_user", JSON.stringify(foundUser));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerPharmacy = async (data: PharmacyRegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, validate the central fill code
      const validCentralFill = MOCK_USERS.find(
        u => u.role === "centralfill" && u.centralFillCode === data.centralFillCode
      );
      
      if (!validCentralFill) {
        toast({
          title: "Registration Failed",
          description: "Invalid Central Fill connection code",
          variant: "destructive"
        });
        return false;
      }
      
      // In a real app, check if email already exists and hash password
      
      // Create new user (this is just for demo)
      const newUser: UserData = {
        id: `p-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: "pharmacy",
        organizationName: data.organizationName,
        organizationId: `p-${Date.now()}`,
        centralFillConnections: [validCentralFill.organizationId]
      };
      
      // In a real app, save to database
      
      // Save user to state and localStorage
      setUser(newUser);
      localStorage.setItem("pharma_user", JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: "Your pharmacy account has been created",
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const registerCentralFill = async (data: CentralFillRegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, check if email already exists and hash password
      
      // Generate a unique code for this central fill
      const centralFillCode = `${data.organizationName.substring(0, 3).toUpperCase()}${Math.floor(10000 + Math.random() * 90000)}`;
      
      // Create new user (this is just for demo)
      const newUser: UserData = {
        id: `cf-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: "centralfill",
        organizationName: data.organizationName,
        organizationId: `cf-${Date.now()}`,
        pharmacyConnections: [],
        centralFillCode
      };
      
      // In a real app, save to database
      
      // Save user to state and localStorage
      setUser(newUser);
      localStorage.setItem("pharma_user", JSON.stringify(newUser));
      
      toast({
        title: "Registration Successful",
        description: `Your Central Fill account has been created. Your connection code is: ${centralFillCode}`,
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pharma_user");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login,
        registerPharmacy,
        registerCentralFill, 
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
