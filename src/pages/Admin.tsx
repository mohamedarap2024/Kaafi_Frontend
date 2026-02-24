import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { productService } from "@/services/productService";

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await productService.create({ name, description, price, category, countInStock, image });
      toast({ title: "Product created", description: "The product was added successfully." });
      // reset form
      setName("");
      setDescription("");
      setPrice(0);
      setCategory("");
      setCountInStock(0);
      setImage("");
    } catch (err: any) {
      toast({ title: "Create failed", description: err.message || "Could not create product", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Admin — Add Product</h1>
      <form onSubmit={handleCreate} className="space-y-4 bg-card p-6 rounded-lg">
        <div>
          <Label>Product Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <Label>Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Price</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </div>
          <div>
            <Label>Count In Stock</Label>
            <Input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} />
          </div>
        </div>

        <div>
          <Label>Category</Label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
};

export default Admin;
