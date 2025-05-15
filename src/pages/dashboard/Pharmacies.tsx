
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, Package, Plus, User, Copy, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Sample pharmacy data
const SAMPLE_PHARMACIES = [
  {
    id: "p-123",
    name: "ABC Pharmacy",
    address: "123 Main St, Anytown, USA",
    contactPerson: "John Smith",
    email: "info@abcpharmacy.com",
    phone: "555-123-4567",
    status: "active",
    joinedDate: "2023-01-15",
    lastOrder: "2023-05-10"
  },
  {
    id: "p-456",
    name: "MedPlus Pharmacy",
    address: "456 Oak Ave, Somewhere, USA",
    contactPerson: "Jane Doe",
    email: "contact@medplus.com",
    phone: "555-987-6543",
    status: "active",
    joinedDate: "2023-02-22",
    lastOrder: "2023-05-18"
  },
  {
    id: "p-789",
    name: "Community Health Pharmacy",
    address: "789 Elm St, Nowhere, USA",
    contactPerson: "Robert Johnson",
    email: "info@communityrx.org",
    phone: "555-456-7890",
    status: "inactive",
    joinedDate: "2023-03-10",
    lastOrder: "2023-04-05"
  }
];

const Pharmacies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Filter pharmacies based on search term
  const filteredPharmacies = SAMPLE_PHARMACIES.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyCode = () => {
    if (user?.centralFillCode) {
      navigator.clipboard.writeText(user.centralFillCode);
      setCopied(true);
      toast({
        title: "Connection Code Copied",
        description: "Share this code with pharmacies to connect with your central fill"
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Connected Pharmacies</h1>
          <p className="text-pharma-muted">
            Manage pharmacy connections and share your connection code
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search pharmacies..."
              className="pl-9 min-w-[240px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="bg-pharma-primary/5 pb-3">
          <CardTitle className="text-lg">Your Connection Code</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-pharma-muted mb-1">
                Share this code with pharmacies who want to connect with your central fill:
              </p>
              <div className="flex items-center">
                <code className="bg-gray-100 px-4 py-2 font-mono text-lg rounded">
                  {user?.centralFillCode || "XYZ12345"}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  className="ml-2"
                >
                  {copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </Button>
              </div>
            </div>
            <Button className="whitespace-nowrap">
              <Plus size={16} className="mr-1" />
              Invite Pharmacy
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {filteredPharmacies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border">
          <User size={40} className="mx-auto text-gray-300 mb-2" />
          <p className="text-pharma-muted">No pharmacies found matching your search</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pharmacy
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPharmacies.map((pharmacy) => (
                <tr key={pharmacy.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{pharmacy.name}</div>
                      <div className="text-sm text-gray-500">{pharmacy.address}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium">{pharmacy.contactPerson}</div>
                      <div className="text-sm text-gray-500">{pharmacy.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={
                      pharmacy.status === 'active'
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }>
                      {pharmacy.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(pharmacy.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(pharmacy.lastOrder).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Pharmacies;
