
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  hideFooter?: boolean;
}

const PageWrapper = ({ children, className = "", hideFooter = false }: PageWrapperProps) => {
  const isMobile = useIsMobile();
  const topPadding = isMobile ? "pt-20" : "pt-24";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${topPadding} ${className}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageWrapper;
