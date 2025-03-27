
import { useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import TaxSavingOptions from "@/components/TaxSavingOptions";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TaxPlanner = () => {
  const navigate = useNavigate();
  
  // Scroll to top on mount
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
          <h1 className="text-3xl font-bold mb-4">Tax Saving Options</h1>
          <p className="text-gray-600">
            Discover various tax-saving investments and deductions available under the Income Tax Act
            to optimize your tax liability and increase your savings.
          </p>
        </div>
        
        <TaxSavingOptions />
        
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Understanding Tax Planning in India</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Tax planning involves analyzing your financial situation from a tax perspective to ensure maximum
              tax efficiency. In India, the Income Tax Act provides various sections like 80C, 80D, and 80G 
              that allow for deductions and exemptions.
            </p>
            <p>
              Key principles of effective tax planning in India:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>Choose between the old and new tax regime based on your financial profile</li>
              <li>Invest in tax-saving instruments like ELSS, PPF, NPS, and insurance as recommended by SEBI and RBI</li>
              <li>Utilize Section 80C benefits (up to ₹1.5 lakhs deduction)</li>
              <li>Consider health insurance premium deductions under Section 80D</li>
              <li>Plan your home loan EMIs to maximize deductions under Section 24</li>
              <li>Review your tax plan regularly as tax laws change annually with the Union Budget</li>
            </ul>
            <p className="italic mt-4 text-sm">
              Disclaimer: The information provided here is for general information purposes only and complies with current 
              SEBI and RBI guidelines. Tax laws change frequently with the annual Union Budget, and specific provisions 
              may vary based on individual circumstances. Please consult a qualified tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default TaxPlanner;
