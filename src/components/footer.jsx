import { Link } from "react-router-dom";
const Footer = ()=>{
    return(
        <>
            <footer className="bg-gray-800 text-white text-center py-6 bottom-0 ">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg">© 2025 Envision-MRI. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
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
        </>
    )
}
export default Footer;