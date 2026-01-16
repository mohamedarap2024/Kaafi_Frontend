import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const features = [
    { icon: Truck, text: "Free Delivery" },
    { icon: Shield, text: "Secure Payment" },
    { icon: Clock, text: "24/7 Support" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary/20 text-primary-foreground backdrop-blur-sm animate-fade-in">
            🛒 Welcome to Kaafi Online Market
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight animate-fade-in [animation-delay:100ms]">
            Shop Smart,
            <br />
            <span className="text-primary">Live Better</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg animate-fade-in [animation-delay:200ms]">
            Discover amazing products at unbeatable prices. Quality you can trust, 
            delivered right to your doorstep in Mogadishu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in [animation-delay:300ms]">
            <Button variant="hero" asChild>
              <Link to="/products">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" asChild>
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 animate-fade-in [animation-delay:400ms]">
            {features.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-primary-foreground/80">
                <div className="p-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
