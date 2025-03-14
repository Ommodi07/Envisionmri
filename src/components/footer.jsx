import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-6 bottom-0 w-full">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-lg">© 2025 Envision-MRI. All rights reserved.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-2 text-sm md:text-base">
          <Link to="/" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/" className="hover:text-blue-500">
            Contact
          </Link>
          <Link to="/" className="hover:text-blue-500">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
