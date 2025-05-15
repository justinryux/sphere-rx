
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, PharmacyRegisterData, CentralFillRegisterData } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const [activeTab, setActiveTab] = useState<"pharmacy" | "centralfill">("pharmacy");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { registerPharmacy, registerCentralFill } = useAuth();
  const navigate = useNavigate();
  
  // Pharmacy form state
  const [pharmacyData, setPharmacyData] = useState<PharmacyRegisterData>({
    email: "",
    password: "",
    name: "",
    organizationName: "",
    centralFillCode: "",
  });
  
  // Central Fill form state
  const [centralFillData, setCentralFillData] = useState<CentralFillRegisterData>({
    email: "",
    password: "",
    name: "",
    organizationName: "",
  });

  const handlePharmacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await registerPharmacy(pharmacyData);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCentralFillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await registerCentralFill(centralFillData);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const updatePharmacyData = (field: keyof PharmacyRegisterData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPharmacyData({ ...pharmacyData, [field]: e.target.value });
  };

  const updateCentralFillData = (field: keyof CentralFillRegisterData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCentralFillData({ ...centralFillData, [field]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pharma-background py-8">
      <div className="max-w-md w-full px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-pharma-primary">PharmConnect</h1>
          <p className="text-pharma-muted mt-2">Pharmacy-Central Fill Connection Platform</p>
        </div>
        
        <Card className="border-pharma-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Create an Account</CardTitle>
            <CardDescription>Select your account type below</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="pharmacy"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "pharmacy" | "centralfill")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="pharmacy">Pharmacy</TabsTrigger>
                <TabsTrigger value="centralfill">Central Fill</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pharmacy">
                <form onSubmit={handlePharmacySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="p-email">Email</Label>
                    <Input
                      id="p-email"
                      type="email"
                      placeholder="your@pharmacy.com"
                      value={pharmacyData.email}
                      onChange={updatePharmacyData("email")}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="p-name">Your Name</Label>
                      <Input
                        id="p-name"
                        type="text"
                        placeholder="John Smith"
                        value={pharmacyData.name}
                        onChange={updatePharmacyData("name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="p-org">Pharmacy Name</Label>
                      <Input
                        id="p-org"
                        type="text"
                        placeholder="ABC Pharmacy"
                        value={pharmacyData.organizationName}
                        onChange={updatePharmacyData("organizationName")}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="p-code">
                      Central Fill Connection Code
                      <span className="text-xs ml-2 text-pharma-muted">(Required)</span>
                    </Label>
                    <Input
                      id="p-code"
                      type="text"
                      placeholder="XYZ12345"
                      value={pharmacyData.centralFillCode}
                      onChange={updatePharmacyData("centralFillCode")}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="p-password">Password</Label>
                    <Input
                      id="p-password"
                      type="password"
                      value={pharmacyData.password}
                      onChange={updatePharmacyData("password")}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-pharma-primary hover:bg-pharma-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Pharmacy Account"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="centralfill">
                <form onSubmit={handleCentralFillSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cf-email">Email</Label>
                    <Input
                      id="cf-email"
                      type="email"
                      placeholder="your@centralfill.com"
                      value={centralFillData.email}
                      onChange={updateCentralFillData("email")}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cf-name">Your Name</Label>
                      <Input
                        id="cf-name"
                        type="text"
                        placeholder="Jane Smith"
                        value={centralFillData.name}
                        onChange={updateCentralFillData("name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cf-org">Organization Name</Label>
                      <Input
                        id="cf-org"
                        type="text"
                        placeholder="XYZ Central Fill"
                        value={centralFillData.organizationName}
                        onChange={updateCentralFillData("organizationName")}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cf-password">Password</Label>
                    <Input
                      id="cf-password"
                      type="password"
                      value={centralFillData.password}
                      onChange={updateCentralFillData("password")}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-pharma-primary hover:bg-pharma-secondary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Create Central Fill Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <div className="text-sm text-center text-gray-600">
              <span>Already have an account? </span>
              <Link to="/login" className="text-pharma-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
