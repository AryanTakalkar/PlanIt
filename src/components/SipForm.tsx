
import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Calendar, Coins } from "lucide-react";

const SipForm = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [result, setResult] = useState<{
    totalInvestment: number;
    estimatedReturns: number;
    totalValue: number;
  } | null>(null);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = years * 12;
    
    const totalInvestment = monthlyInvestment * months;
    const totalValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const estimatedReturns = totalValue - totalInvestment;
    
    setResult({
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(totalValue),
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg bg-white">
        <CardHeader className="bg-finance-lightBlue rounded-t-lg">
          <CardTitle className="text-2xl font-semibold">SIP Calculator</CardTitle>
          <CardDescription>Calculate returns on your Systematic Investment Plan</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="monthly-investment" className="text-base flex items-center">
                  <Coins className="mr-2 h-4 w-4" /> Monthly Investment (₹)
                </Label>
                <Input
                  id="monthly-investment-value"
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  className="w-24 text-right"
                />
              </div>
              <Slider
                id="monthly-investment"
                min={500}
                max={100000}
                step={500}
                value={[monthlyInvestment]}
                onValueChange={(value) => setMonthlyInvestment(value[0])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹500</span>
                <span>₹100,000</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="investment-period" className="text-base flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Investment Period (Years)
                </Label>
                <Input
                  id="investment-period-value"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-24 text-right"
                  min={1}
                  max={30}
                />
              </div>
              <Slider
                id="investment-period"
                min={1}
                max={30}
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="expected-return" className="text-base flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" /> Expected Return Rate (% p.a.)
                </Label>
                <Input
                  id="expected-return-value"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="w-24 text-right"
                  min={1}
                  max={30}
                />
              </div>
              <Slider
                id="expected-return"
                min={1}
                max={30}
                value={[expectedReturn]}
                onValueChange={(value) => setExpectedReturn(value[0])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1%</span>
                <span>30%</span>
              </div>
            </div>

            <Button 
              onClick={calculateSIP}
              className="finance-button w-full"
            >
              Calculate
            </Button>

            {result && (
              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">SIP Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-600">Invested Amount</p>
                    <p className="text-xl font-semibold">₹{result.totalInvestment.toLocaleString()}</p>
                  </div>
                  <div className="bg-finance-lightBlue p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">Estimated Returns</p>
                    <p className="text-xl font-semibold text-brand-500">₹{result.estimatedReturns.toLocaleString()}</p>
                  </div>
                  <div className="bg-finance-lightGold p-4 rounded-lg border border-amber-100">
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-xl font-semibold text-amber-600">₹{result.totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SipForm;
