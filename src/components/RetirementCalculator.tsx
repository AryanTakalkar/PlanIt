
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, CalendarClock } from "lucide-react";

interface RetirementCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RetirementCalculator = ({ open, onOpenChange }: RetirementCalculatorProps) => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [result, setResult] = useState<null | {
    corpsRequired: number;
    monthlySIP: number;
    yearsToRetirement: number;
  }>(null);

  const calculateRetirement = () => {
    const current = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    const expense = parseInt(monthlyExpense);

    if (isNaN(current) || isNaN(retirement) || isNaN(expense)) {
      return;
    }

    const yearsToRetirement = retirement - current;
    const inflationRate = 0.06; // 6% annual inflation
    const investmentReturn = 0.12; // 12% annual returns
    const postRetirementReturn = 0.08; // 8% post retirement returns
    const lifeExpectancy = 85;
    const yearsAfterRetirement = lifeExpectancy - retirement;

    // Future value of monthly expenses due to inflation
    const futureMonthlyExpense = expense * Math.pow(1 + inflationRate, yearsToRetirement);
    
    // Corpus required at retirement
    const corpsRequired = futureMonthlyExpense * 12 * 
      ((1 - Math.pow(1 + postRetirementReturn, -yearsAfterRetirement)) / postRetirementReturn);
    
    // Monthly SIP needed
    const monthlySIP = corpsRequired / 
      ((Math.pow(1 + investmentReturn / 12, yearsToRetirement * 12) - 1) / 
      (investmentReturn / 12) * (1 + investmentReturn / 12));

    setResult({
      corpsRequired: Math.round(corpsRequired),
      monthlySIP: Math.round(monthlySIP),
      yearsToRetirement,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="bg-finance-lightBlue p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CalendarClock className="text-brand-500" size={24} />
              <DialogTitle className="text-xl font-semibold">Add Retirement Goal</DialogTitle>
            </div>
            <DialogClose className="h-6 w-6 rounded-full hover:bg-gray-200 inline-flex items-center justify-center">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-age">What is your current age?</Label>
              <p className="text-sm text-brand-500">Enter age in years</p>
              <Input
                id="current-age"
                className="finance-input"
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="retirement-age">When are you planning to retire?</Label>
              <p className="text-sm text-brand-500">Enter age in years</p>
              <Input
                id="retirement-age"
                className="finance-input"
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthly-expense">What is your current monthly expense?</Label>
              <p className="text-sm text-brand-500">Enter amount in Rupees</p>
              <Input
                id="monthly-expense"
                className="finance-input"
                type="number"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <Button 
              onClick={calculateRetirement}
              className="finance-button-gold w-full"
            >
              Calculate
            </Button>

            {result && (
              <div className="mt-6 space-y-4 bg-finance-lightGold p-4 rounded-lg">
                <h3 className="font-semibold text-lg">Your Retirement Plan</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Years to Retirement</p>
                    <p className="text-xl font-semibold">{result.yearsToRetirement} years</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Corpus Required at Retirement</p>
                    <p className="text-xl font-semibold">₹{result.corpsRequired.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Monthly SIP Required</p>
                    <p className="text-xl font-semibold">₹{result.monthlySIP.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RetirementCalculator;
