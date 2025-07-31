import Sidebar from "./layout/Sidebar";
import Navbar from "./layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
        <div className="flex min-h-screen w-full bg-[#0A0A1F] font-Tomorrow relative overflow-hidden">
          {/* Top-left light accent */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#028EFC]/72 rounded-full blur-[362px] -translate-x-1/8 -translate-y-1/5"></div>
          
          {/* Bottom-right light accent */}
          <div className="absolute bottom-2.5 right-0 w-96 h-96 bg-[#028EFC]/72 rounded-full blur-[362px] translate-x-1/3 translate-y-1/12"></div>
          
          <Sidebar />
          {/* Main content */}
          <div className="container mx-auto flex-1 px-6 py-6 sm:px-16 sm:py-6 relative z-10">
            <Navbar />
            {/* Main content area */}
            <div>{children}</div>
          </div>
        
        </div>
      
  );
}
