import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types/product";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      to={`/products?category=${category.name}`}
      className="group relative flex flex-col items-center justify-center p-6 rounded-xl bg-card shadow-soft transition-all duration-300 hover:shadow-hover hover:-translate-y-1"
    >
      <span className="text-4xl mb-3">{category.icon}</span>
      <h3 className="font-semibold text-card-foreground">{category.name}</h3>
      <p className="text-sm text-muted-foreground">{category.productCount} Products</p>
      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default CategoryCard;
