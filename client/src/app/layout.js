import { Toaster } from "react-hot-toast";
import Navbar from "../../components/navbar";
import "./globals.css";

export const metadata = {
  title: "Sabmaf Works",
  description: "We'll help you design, model, mange and build your Structures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth h-full">
      <body className=" relative scroll-smooth h-full font-garamond">
        <Toaster
          position="top-right"
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,

            // Default options for specific types
            success: {
              duration: 5000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 5000,
              theme: {
                primary: "red",
                secondary: "black",
              },
            },
          }}
        />
        <Navbar />
        {children}
       
      </body>
    </html>
  );
}
