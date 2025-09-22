import React from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const Orders = () => {
  // Mock orders data
  const orders: Order[] = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 450,
      items: [
        { id: '1', name: 'Fresh Organic Bananas', quantity: 2, price: 45 },
        { id: '2', name: 'Red Delicious Apples', quantity: 1, price: 120 },
        { id: '3', name: 'Fresh Whole Milk', quantity: 3, price: 65 },
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-18',
      status: 'shipped',
      total: 320,
      items: [
        { id: '4', name: 'Artisan Bread Loaves', quantity: 2, price: 85 },
        { id: '5', name: 'Fresh Vegetable Mix', quantity: 1, price: 95 },
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-20',
      status: 'processing',
      total: 180,
      items: [
        { id: '6', name: 'Premium Snack Pack', quantity: 1, price: 180 },
      ]
    },
  ];

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            My Orders
          </h1>
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                When you place your first order, it will show up here.
              </p>
              <Button onClick={() => window.history.back()}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <Card
              key={order.id}
              className="animate-fade-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 mb-2`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="text-lg font-semibold text-foreground">
                      ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                    {(order.status === 'pending' || order.status === 'processing') && (
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                  {order.status === 'shipped' && (
                    <Button size="sm" className="bg-primary hover:bg-primary-glow">
                      Track Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;