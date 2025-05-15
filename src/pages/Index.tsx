
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-pharma-primary">PharmConnect</h1>
        </div>
        <div className="space-x-2">
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-pharma-primary hover:bg-pharma-secondary">Register</Button>
          </Link>
        </div>
      </header>
      
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-text leading-tight">
                Connecting Pharmacies with Central Fill Solutions
              </h2>
              <p className="text-lg mb-8 text-pharma-muted max-w-md">
                Streamline your pharmacy operations with a powerful platform that connects you directly to central fill vendors, optimizing inventory and fulfillment processes.
              </p>
              <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                <Link to="/register">
                  <Button className="w-full md:w-auto bg-pharma-primary hover:bg-pharma-secondary text-white px-8 py-2.5">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full md:w-auto px-8 py-2.5">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg bg-white shadow-xl overflow-hidden border border-gray-200 relative z-10">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <div className="text-xs text-gray-500 ml-2">PharmConnect Dashboard</div>
                  </div>
                </div>
                <div className="bg-pharma-background h-full p-4">
                  <div className="grid grid-cols-3 gap-3 h-full">
                    <div className="bg-white rounded shadow p-3 flex flex-col">
                      <div className="bg-pharma-primary/10 h-2 w-16 mb-2 rounded"></div>
                      <div className="bg-gray-200 h-2 w-20 mb-4 rounded"></div>
                      <div className="bg-gray-100 h-16 rounded mb-2"></div>
                      <div className="bg-gray-100 h-16 rounded"></div>
                    </div>
                    <div className="bg-white rounded shadow p-3 flex flex-col">
                      <div className="bg-pharma-primary/10 h-2 w-12 mb-2 rounded"></div>
                      <div className="bg-gray-200 h-2 w-24 mb-4 rounded"></div>
                      <div className="bg-gray-100 h-8 rounded mb-2"></div>
                      <div className="bg-gray-100 h-8 rounded mb-2"></div>
                      <div className="bg-gray-100 h-8 rounded mb-2"></div>
                    </div>
                    <div className="bg-white rounded shadow p-3 flex flex-col">
                      <div className="bg-pharma-primary/10 h-2 w-14 mb-2 rounded"></div>
                      <div className="bg-gray-200 h-2 w-16 mb-4 rounded"></div>
                      <div className="bg-pharma-primary/20 h-24 rounded mb-2 flex items-center justify-center">
                        <div className="bg-pharma-primary/40 h-8 w-8 rounded-full"></div>
                      </div>
                      <div className="bg-gray-100 h-8 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-pharma-primary/5 rounded-3xl transform translate-x-4 translate-y-4"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">For Both Pharmacies and Central Fill Vendors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-pharma-background p-8 rounded-lg shadow-sm">
              <div className="bg-pharma-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pharma-primary"
                >
                  <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
                  <path d="M8 16 3 21 5 23 10 18"></path>
                  <path d="m17 14 4 4"></path>
                  <path d="m14 14 1 6 5-5-6-1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Pharmacy Benefits</h3>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pharma-primary mr-2 mt-1 flex-shrink-0"
                  >
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                  <span>Streamlined product ordering with real-time pricing</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pharma-primary mr-2 mt-1 flex-shrink-0"
                  >
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                  <span>Real-time order tracking and notifications</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pharma-primary mr-2 mt-1 flex-shrink-0"
                  >
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                  <span>Comprehensive analytics and spending trends</span>
                </li>
              </ul>
              <Link to="/register?type=pharmacy">
                <Button className="bg-pharma-primary hover:bg-pharma-secondary">
                  Register as Pharmacy
                </Button>
              </Link>
            </div>
            
            <div className="bg-pharma-background p-8 rounded-lg shadow-sm">
              <div className="bg-pharma-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pharma-primary"
                >
                  <path d="m7.5 4.27 9 5.15"></path>
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                  <path d="m3.3 7 8.7 5 8.7-5"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Central Fill Benefits</h3>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pharma-primary mr-2 mt-1 flex-shrink-0"
                  >
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                  <span>Centralized order management system</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pharma-primary mr-2 mt-1 flex-shrink-0"
                  >
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                  <span>Efficient product catalog management</span>
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-pharma-primary mr-2 mt-1 flex-shrink-0"
                  >
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                  <span>Revenue tracking and business analytics</span>
                </li>
              </ul>
              <Link to="/register?type=centralfill">
                <Button className="bg-pharma-primary hover:bg-pharma-secondary">
                  Register as Central Fill
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© 2023 PharmConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
