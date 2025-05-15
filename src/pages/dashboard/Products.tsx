
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, ShoppingCart, Plus, Package } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Sample product data
const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: 12.99,
    stock: 350,
    sku: "PR-12345",
    image: "https://source.unsplash.com/random/100x100/?pill"
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    category: "Antibiotics",
    price: 24.50,
    stock: 120,
    sku: "AB-67890",
    image: "https://source.unsplash.com/random/100x100/?medicine"
  },
  {
    id: "3",
    name: "Ibuprofen 200mg",
    category: "Pain Relief",
    price: 8.75,
    stock: 430,
    sku: "PR-54321",
    image: "https://source.unsplash.com/random/100x100/?tablets"
  },
  {
    id: "4",
    name: "Loratadine 10mg",
    category: "Allergy",
    price: 15.20,
    stock: 290,
    sku: "AL-13579",
    image: "https://source.unsplash.com/random/100x100/?capsules"
  },
  {
    id: "5",
    name: "Omeprazole 20mg",
    category: "Digestive Health",
    price: 19.95,
    stock: 180,
    sku: "DH-97531",
    image: "https://source.unsplash.com/random/100x100/?medicine"
  },
  {
    id: "6",
    name: "Salbutamol Inhaler",
    category: "Respiratory",
    price: 32.50,
    stock: 85,
    sku: "RE-24680",
    image: "https://source.unsplash.com/random/100x100/?inhaler"
  }
];

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Array<{product: Product, quantity: number}>>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  const isPharmacy = user?.role === "pharmacy";

  // Filter products based on search term
  const filteredProducts = SAMPLE_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    // Check if product is already in cart
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Increase quantity if already in cart
      setCart(
        cart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      );
    } else {
      // Add new item to cart
      setCart([...cart, { product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Products</h1>
          <p className="text-pharma-muted">
            {isPharmacy 
              ? "Browse and order products from your Central Fill" 
              : "Manage your product catalog"}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Search products..."
              className="pl-9 min-w-[240px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isPharmacy ? (
            <Button className="relative" variant="outline">
              <ShoppingCart size={18} />
              <span className="ml-1">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pharma-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
          ) : (
            <Button>
              <Plus size={16} className="mr-1" />
              Add Product
            </Button>
          )}
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border">
          <Package size={40} className="mx-auto text-gray-300 mb-2" />
          <p className="text-pharma-muted">No products found matching your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <Badge variant="outline" className="mt-1 bg-gray-50">
                          {product.category}
                        </Badge>
                      </div>
                      <span className="text-pharma-primary font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs text-pharma-muted">
                        <span>SKU: {product.sku}</span>
                        <span className="ml-2 px-1.5 py-0.5 bg-green-50 text-green-700 rounded">
                          {product.stock > 100 ? "In Stock" : product.stock > 10 ? "Limited" : "Low Stock"}
                        </span>
                      </div>
                      
                      {isPharmacy ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleAddToCart(product)}
                          variant="ghost"
                          className="text-xs h-8 hover:bg-pharma-primary hover:text-white"
                        >
                          <ShoppingCart size={14} className="mr-1" />
                          Add
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-xs h-8 hover:bg-pharma-primary hover:text-white"
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Products;
