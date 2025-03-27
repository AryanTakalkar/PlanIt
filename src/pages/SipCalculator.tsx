
import { useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import SipForm from "@/components/SipForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SipCalculator = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">SIP Calculator</h1>
          <p className="text-gray-600">
            Estimate your future returns on systematic investments with our easy-to-use calculator.
            Adjust your monthly investment, time period, and expected returns to see how your money grows.
          </p>
        </div>
        
        <SipForm />
        
        <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">About Systematic Investment Plans (SIPs)</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              A Systematic Investment Plan (SIP) is an investment strategy that allows you to invest a fixed amount
              regularly in mutual funds. It is one of the most popular investment methods in India, regulated by SEBI 
              (Securities and Exchange Board of India).
            </p>
            <p>
              Key benefits of SIPs include:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Disciplined approach to investing without timing the market</li>
              <li>Benefit of rupee-cost averaging, buying more units when prices are low</li>
              <li>Power of compounding over long investment periods</li>
              <li>Flexibility to start with small amounts (as low as ₹500 per month)</li>
              <li>Tax benefits under Section 80C of the Income Tax Act (for ELSS funds)</li>
              <li>Option to increase investment amount as your income grows via SIP Top-up facility</li>
            </ul>
            <p>
              Our calculator uses standard SIP calculation formulas recommended by AMFI (Association of Mutual Funds in India).
              Actual returns may vary based on market performance and specific investment choices.
            </p>
            <p className="text-sm italic mt-4">
              Note: All mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SipCalculator;
