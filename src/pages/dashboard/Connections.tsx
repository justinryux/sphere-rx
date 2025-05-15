
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample central fill vendor data
const SAMPLE_VENDORS = [
  {
    id: "cf-456",
    name: "XYZ Central Fill",
    code: "XYZ12345",
    address: "789 Industry Blvd, Cityville, USA",
    contactPerson: "Jane Smith",
    email: "jane@xyzcentralfill.com",
    phone: "555-789-1234",
    status: "active",
    connected: "2023-01-15",
    products: 250,
  },
  {
    id: "cf-789",
    name: "PharmaFill Solutions",
    code: "PFS98765",
    address: "456 Warehouse Ave, Commerce City, USA",
    contactPerson: "Mike Johnson",
    email: "mike@pharmafill.com",
    phone: "555-234-5678",
    status: "inactive",
    connected: "2023-03-22",
    products: 180,
  }
];

const Connections = () => {
  const { user } = useAuth();
  
  // In a real app, this would come from the user's data
  const connectedVendors = SAMPLE_VENDORS.filter(vendor => 
    user?.centralFillConnections?.includes(vendor.id)
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Central Fill Connections</h1>
        <p className="text-pharma-muted">
          Manage your connections to Central Fill vendors
        </p>
      </div>
      
      <div className="flex justify-end mb-4">
        <Button>
          Add New Connection
        </Button>
      </div>

      {connectedVendors.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-pharma-primary/10 rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pharma-primary"
              >
                <path d="M16 16h6"></path>
                <path d="M19 13v6"></path>
                <circle cx="9" cy="12" r="8"></circle>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No Connected Vendors</h3>
            <p className="text-sm text-gray-500 text-center max-w-sm mb-4">
              Connect with Central Fill vendors to start ordering products and managing your inventory.
            </p>
            <Button>Add Central Fill Connection</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {connectedVendors.map((vendor) => (
            <Card key={vendor.id} className="overflow-hidden">
              <CardHeader className="bg-pharma-primary/5 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{vendor.name}</CardTitle>
                  </div>
                  <Badge className={
                    vendor.status === 'active'
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }>
                    {vendor.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Connection Details</h4>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Connection Code:</span> {vendor.code}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Connected Since:</span> {new Date(vendor.connected).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Products Available:</span> {vendor.products}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Contact Person:</span> {vendor.contactPerson}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Email:</span> {vendor.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {vendor.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6 pt-4 border-t">
                  <Button variant="outline" className="mr-2">View Catalog</Button>
                  <Button>Place Order</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Connections;
