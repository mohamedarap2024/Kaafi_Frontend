import { Link } from "react-router-dom";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Kaafi Online Market" className="h-12 w-12 rounded-full object-cover" />
              <span className="font-bold text-lg">
                Kaafi <span className="text-primary">Online Market</span>
              </span>
            </Link>
            <p className="text-sm text-secondary-foreground/70">
              Your trusted online marketplace in Somalia. Quality products, fast delivery, 
              and excellent customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Products", "Categories", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {["FAQ", "Shipping Info", "Returns", "Order Tracking", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                Tarabuuka, Hodan District, Mogadishu, Somalia
              </li>
              <li>
                <a
                  href="tel:+252617655538"
                  className="flex items-center gap-3 text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +252 61 7655538
                </a>
              </li>
              <li>
                <a
                  href="mailto:Calibulshawi09@gmail.com"
                  className="flex items-center gap-3 text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Calibulshawi09@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/KaafiOnlineMarket"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  <Facebook className="h-4 w-4 text-primary" />
                  Kaafi Online Market
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} Kaafi Online Market. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
              alt="Visa"
              className="h-6 opacity-60"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/200px-MasterCard_Logo.svg.png"
              alt="Mastercard"
              className="h-6 opacity-60"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
