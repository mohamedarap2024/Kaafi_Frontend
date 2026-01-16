import { Link } from "react-router-dom";
import { Target, Users, Shield, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Quality Products",
      description: "We carefully select every product to ensure it meets our high standards of quality.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're here to help you find exactly what you need.",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Shop with confidence. Your transactions and data are protected with top-tier security.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and safely right to your doorstep in Mogadishu.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="gradient-hero py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src={logo}
              alt="Kaafi Online Market"
              className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-primary-foreground/20"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              About Kaafi Online Market
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Your trusted online marketplace in Somalia, bringing quality products 
              and exceptional service to customers across Mogadishu and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in the heart of Mogadishu's Hodan District, Kaafi Online Market 
              was born from a simple vision: to make quality products accessible to everyone 
              in Somalia through the convenience of online shopping.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We understand the challenges of finding reliable products and trustworthy 
              sellers. That's why we've built a platform that prioritizes transparency, 
              quality, and customer satisfaction above all else.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we serve thousands of customers, offering a wide range of products 
              from electronics to fashion, all delivered with care to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }, index) => (
              <div
                key={title}
                className="bg-card rounded-xl p-6 shadow-soft hover:shadow-hover transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-card rounded-2xl shadow-card p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Explore our collection of quality products and experience the 
              convenience of online shopping with Kaafi Online Market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/products">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
