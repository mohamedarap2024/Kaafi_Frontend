import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/products";

const Categories = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shop by Category</h1>
          <p className="text-muted-foreground">
            Browse our wide selection of product categories
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name}`}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <span className="text-5xl mb-4 block">{category.icon}</span>
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {category.productCount} Products
                </p>
                <div className="flex items-center gap-2 text-primary font-medium">
                  Explore Category
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
