import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { CreditCard, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!user) return <Navigate to="/auth" replace />;
  if (items.length === 0) return <Navigate to="/products" replace />;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total: totalPrice,
        shipping_address: address,
        phone,
      })
      .select()
      .single();

    if (orderError || !order) {
      toast({ title: "Order failed", description: orderError?.message, variant: "destructive" });
      setSubmitting(false);
      return;
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      product_name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      toast({ title: "Order items failed", description: itemsError.message, variant: "destructive" });
    } else {
      clearCart();
      toast({ title: "Order placed!", description: "Your order has been confirmed." });
      navigate("/");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleOrder} className="space-y-6">
          {/* Order Summary */}
          <div className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
            <h2 className="font-semibold text-lg">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-card rounded-2xl p-6 shadow-soft space-y-4">
            <h2 className="font-semibold text-lg">Shipping Details</h2>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="address"
                  placeholder="Your delivery address in Mogadishu"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+252 61 XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            <CreditCard className="mr-2 h-5 w-5" />
            {submitting ? "Placing Order..." : `Place Order — $${totalPrice.toFixed(2)}`}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
