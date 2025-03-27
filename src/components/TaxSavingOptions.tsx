
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  HomeIcon, 
  HeartPulse, 
  Umbrella, 
  Gift, 
  BadgePercent, 
  PiggyBank, 
  GraduationCap
} from "lucide-react";

const TaxSavingOptions = () => {
  const taxOptions = [
    {
      id: "section-80c",
      title: "Section 80C",
      subtitle: "Up to ₹1,50,000 deduction",
      description: "Includes investments in EPF, PPF, ELSS, NSC, Tax Saving FDs and more.",
      icon: <PiggyBank className="h-5 w-5" />,
      options: [
        { name: "Public Provident Fund (PPF)", description: "Long-term savings with tax-free returns" },
        { name: "Employees' Provident Fund (EPF)", description: "Retirement benefit for salaried employees" },
        { name: "Equity Linked Savings Scheme (ELSS)", description: "Tax-saving mutual funds with market returns" },
        { name: "National Savings Certificate (NSC)", description: "Government-backed savings bond" },
        { name: "Tax Saving Fixed Deposits", description: "5-year fixed deposits with guaranteed returns" },
        { name: "Life Insurance Premium", description: "Premium paid towards life insurance policies" },
        { name: "Sukanya Samriddhi Yojana", description: "Savings scheme for girl child education" },
      ]
    },
    {
      id: "section-80d",
      title: "Section 80D",
      subtitle: "Health Insurance Premium",
      description: "Deduction for health insurance premiums paid for self, family, and parents.",
      icon: <HeartPulse className="h-5 w-5" />,
      options: [
        { name: "Self & Family Insurance", description: "Up to ₹25,000 (₹50,000 for senior citizens)" },
        { name: "Parents' Insurance", description: "Additional ₹25,000 (₹50,000 if senior citizens)" },
        { name: "Preventive Health Check-up", description: "Up to ₹5,000 included in the above limits" }
      ]
    },
    {
      id: "section-80e",
      title: "Section 80E",
      subtitle: "Education Loan Interest",
      description: "Deduction for interest paid on education loan taken for higher education.",
      icon: <GraduationCap className="h-5 w-5" />,
      options: [
        { name: "Education Loan Interest", description: "Full interest amount deductible (no upper limit)" },
        { name: "Eligibility Period", description: "For 8 years or until interest is fully paid, whichever is earlier" }
      ]
    },
    {
      id: "section-24b",
      title: "Section 24B",
      subtitle: "Home Loan Interest",
      description: "Deduction for interest paid on home loan for self-occupied property.",
      icon: <HomeIcon className="h-5 w-5" />,
      options: [
        { name: "Self-occupied Property", description: "Up to ₹2,00,000 per year" },
        { name: "Let-out Property", description: "No limit (full interest amount deductible)" }
      ]
    },
    {
      id: "section-80g",
      title: "Section 80G",
      subtitle: "Charitable Donations",
      description: "Deduction for donations made to approved charitable organizations.",
      icon: <Gift className="h-5 w-5" />,
      options: [
        { name: "100% Deduction", description: "Eligible donations to certain funds like PM CARES Fund" },
        { name: "50% Deduction", description: "Eligible donations to most charitable organizations" }
      ]
    },
    {
      id: "nps",
      title: "National Pension Scheme",
      subtitle: "Section 80CCD",
      description: "Additional deduction of up to ₹50,000 for contributions to NPS.",
      icon: <Umbrella className="h-5 w-5" />,
      options: [
        { name: "Section 80CCD(1)", description: "Part of 80C limit (₹1,50,000)" },
        { name: "Section 80CCD(1B)", description: "Additional ₹50,000 deduction" },
        { name: "Section 80CCD(2)", description: "Employer contribution (up to 10% of salary)" }
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg bg-white">
        <CardHeader className="bg-finance-lightGold rounded-t-lg">
          <div className="flex items-center gap-3">
            <BadgePercent className="h-6 w-6 text-amber-600" />
            <div>
              <CardTitle className="text-2xl font-semibold">Tax Saving Options</CardTitle>
              <CardDescription>Explore various tax-saving investments and deductions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {taxOptions.map((option) => (
                <AccordionItem key={option.id} value={option.id} className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
                  <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
                    <div className="flex items-center text-left">
                      <div className="h-10 w-10 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mr-4">
                        {option.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{option.title}</h3>
                        <p className="text-sm text-gray-600">{option.subtitle}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2 pb-4">
                    <p className="text-gray-700 mb-4">{option.description}</p>
                    <div className="space-y-3">
                      {option.options.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-4 bg-brand-500 hover:bg-brand-600">
                      Learn More
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxSavingOptions;
