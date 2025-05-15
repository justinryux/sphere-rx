
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShoppingCart, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample order data
const SAMPLE_ORDERS = [
  {
    id: "ORD-1234",
    date: "2023-05-18",
    pharmacy: {
      id: "p-123",
      name: "ABC Pharmacy"
    },
    items: [
      { name: "Paracetamol 500mg", quantity: 5, price: 12.99 },
      { name: "Amoxicillin 250mg", quantity: 2, price: 24.50 },
    ],
    status: "processing",
    total: 113.95,
    trackingNumber: null
  },
  {
    id: "ORD-1235",
    date: "2023-05-17",
    pharmacy: {
      id: "p-456",
      name: "MedPlus Pharmacy"
    },
    items: [
      { name: "Ibuprofen 200mg", quantity: 3, price: 8.75 },
      { name: "Loratadine 10mg", quantity: 1, price: 15.20 },
    ],
    status: "shipped",
    total: 41.45,
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD-1236",
    date: "2023-05-16",
    pharmacy: {
      id: "p-789",
      name: "Community Health Pharmacy"
    },
    items: [
      { name: "Omeprazole 20mg", quantity: 2, price: 19.95 },
    ],
    status: "delivered",
    total: 39.90,
    trackingNumber: "TRK987654321"
  },
  {
    id: "ORD-1237",
    date: "2023-05-15",
    pharmacy: {
      id: "p-123",
      name: "ABC Pharmacy"
    },
    items: [
      { name: "Salbutamol Inhaler", quantity: 1, price: 32.50 },
      { name: "Paracetamol 500mg", quantity: 2, price: 12.99 },
    ],
    status: "delivered",
    total: 58.48,
    trackingNumber: "TRK456789123"
  }
];

const statusColors: Record<string, string> = {
  processing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  shipped: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  delivered: "bg-green-100 text-green-800 hover:bg-green-200",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-200"
};

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { user } = useAuth();
  const isPharmacy = user?.role === "pharmacy";

  // Filter orders based on search term and status
  const filteredOrders = SAMPLE_ORDERS.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // If pharmacy, only show their own orders
  const ordersToDisplay = isPharmacy 
    ? filteredOrders.filter(order => order.pharmacy.id === user?.organizationId)
    : filteredOrders;

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Orders</h1>
          <p className="text-pharma-muted">
            {isPharmacy 
              ? "View and track your orders" 
              : "Manage pharmacy orders and shipments"}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search orders..."
              className="pl-9 min-w-[220px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isPharmacy && (
            <Button>
              <ShoppingCart size={16} className="mr-1" />
              New Order
            </Button>
          )}
        </div>
      </div>
      
      {ordersToDisplay.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border">
          <FileText size={40} className="mx-auto text-gray-300 mb-2" />
          <p className="text-pharma-muted">No orders found matching your criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                {!isPharmacy && (
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pharmacy
                  </th>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ordersToDisplay.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  {!isPharmacy && (
                    <td className="px-4 py-4 text-sm">
                      <div className="font-medium">{order.pharmacy.name}</div>
                    </td>
                  )}
                  <td className="px-4 py-4">
                    <div className="text-sm">
                      <span className="font-medium">{order.items.length}</span>
                      <span className="text-gray-500 ml-1">
                        {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.items.map(item => item.name).join(", ").substring(0, 25)}
                      {order.items.map(item => item.name).join(", ").length > 25 ? "..." : ""}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-800"}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    {order.trackingNumber && (
                      <div className="text-xs text-gray-500 mt-1">
                        Tracking: {order.trackingNumber}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right font-medium">
                    ${order.total.toFixed(2)}
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

export default Orders;
