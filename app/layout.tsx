//import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./Components/Sidebar";
import { inter } from './fonts'
// import "./Styles/usersSetting.css";

 import "./Styles/adminPanel.css";
 import "./Styles/login.css";
 import "./Styles/order.css";
 import "./Styles/homepage.css";
 import "./Styles/main.css"
import AuthProvider from "./context/AuthProvider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import {NextUIProvider} from "@nextui-org/react";
import {Providers} from "./providers";



//const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Admin Pannel",
  description: "Shared admin panel for soccery tv and Krira tv",
};

export default function RootLayout({ children }) {
  
  
  return (
    <html lang="en" className="light">
      <body >
      <AuthProvider>
        
      <Providers>
          <Sidebar></Sidebar>{children}
          </Providers>
        </AuthProvider>
       <SpeedInsights /> 
      </body>
    </html>
  );
  
}
