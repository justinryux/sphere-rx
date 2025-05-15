
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart, Package, FileText, BarChart, Settings, LogOut } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  
  // If not authenticated and not loading, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pharma-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pharma-muted">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Get navigation items based on user role
  const navItems = user?.role === "pharmacy"
    ? [
        { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
        { icon: Package, label: "Products", href: "/dashboard/products" },
        { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
        { icon: Settings, label: "Connections", href: "/dashboard/connections" },
      ]
    : [
        { icon: Package, label: "Products", href: "/dashboard/products" },
        { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
        { icon: User, label: "Pharmacies", href: "/dashboard/pharmacies" },
        { icon: BarChart, label: "Analytics", href: "/dashboard/analytics" },
      ];

  return (
    <div className="flex min-h-screen bg-pharma-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg text-pharma-primary">PharmConnect</h2>
          <p className="text-xs text-pharma-muted mt-1">
            {user?.role === "pharmacy" ? "Pharmacy Portal" : "Central Fill Portal"}
          </p>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
            <div className="bg-pharma-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
              <User size={20} className="text-pharma-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-pharma-muted truncate max-w-[160px]">{user?.organizationName}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 px-2 py-2.5 rounded-md text-sm hover:bg-pharma-primary/10 transition-colors group"
              >
                <item.icon size={18} className="text-pharma-muted group-hover:text-pharma-primary" />
                <span>{item.label}</span>
              </a>
            ))}
            
            <Button
              variant="ghost"
              className="flex items-center space-x-3 px-2 py-2.5 rounded-md text-sm hover:bg-pharma-primary/10 transition-colors w-full justify-start mt-4 text-pharma-muted hover:text-pharma-danger"
              onClick={logout}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </Button>
          </nav>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
