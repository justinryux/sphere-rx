
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package, BarChart, Settings, User } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the appropriate first page after initial render
    if (user?.role === "pharmacy") {
      navigate("/dashboard/products");
    } else {
      navigate("/dashboard/pharmacies");
    }
  }, [user, navigate]);

  // The component doesn't need to render anything meaningful
  // as it will redirect to another dashboard page
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-pharma-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-pharma-muted">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Dashboard;
