
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Bike,
  Building2,
  Car,
  Home,
  BookOpen,
  Plane,
  Users,
  Coins,
  CalendarClock,
  Briefcase,
  Baby,
  Grid,
  ArrowLeft,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { GoalType } from "@/components/GoalSelection";

interface GoalFormData {
  currentAmount: number;
  targetAmount: number;
  years: number;
  inflationRate: number;
  expectedReturn: number;
}

const GoalPlanner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const goalType = searchParams.get("type") as GoalType;
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<GoalFormData>({
    currentAmount: 0,
    targetAmount: 1000000,
    years: 10,
    inflationRate: 6,
    expectedReturn: 12,
  });
  const [result, setResult] = useState<{
    futureValue: number;
    monthlySIP: number;
  } | null>(null);

  useEffect(() => {
    if (!goalType) {
      navigate("/dashboard");
    }
  }, [goalType, navigate]);

  const getGoalInfo = () => {
    switch(goalType) {
      case "retirement":
        return {
          title: "Retirement Planning",
          description: "Secure your golden years with a solid retirement plan",
          icon: <CalendarClock size={32} className="text-brand-500" />,
          defaultYears: 25,
          defaultAmount: 5000000,
        };
      case "home":
        return {
          title: "Home Purchase Planning",
          description: "Plan for buying your dream home",
          icon: <Home size={32} className="text-brand-500" />,
          defaultYears: 7,
          defaultAmount: 3000000,
        };
      case "education":
        return {
          title: "Education Planning",
          description: "Invest in your educational future",
          icon: <BookOpen size={32} className="text-brand-500" />,
          defaultYears: 5,
          defaultAmount: 1500000,
        };
      case "car":
        return {
          title: "Car Purchase Planning",
          description: "Save for your dream car",
          icon: <Car size={32} className="text-brand-500" />,
          defaultYears: 3,
          defaultAmount: 800000,
        };
      case "bike":
        return {
          title: "Bike Purchase Planning",
          description: "Save for your new bike",
          icon: <Bike size={32} className="text-brand-500" />,
          defaultYears: 2,
          defaultAmount: 200000,
        };
      case "business":
        return {
          title: "Business Investment Planning",
          description: "Plan your business venture funding",
          icon: <Briefcase size={32} className="text-brand-500" />,
          defaultYears: 5,
          defaultAmount: 2000000,
        };
      case "travel":
        return {
          title: "Travel Planning",
          description: "Save for your dream vacation",
          icon: <Plane size={32} className="text-brand-500" />,
          defaultYears: 2,
          defaultAmount: 300000,
        };
      case "wedding":
        return {
          title: "Wedding Planning",
          description: "Save for your special day",
          icon: <Users size={32} className="text-brand-500" />,
          defaultYears: 3,
          defaultAmount: 1500000,
        };
      case "wealth":
        return {
          title: "Wealth Building",
          description: "Grow your wealth through systematic investments",
          icon: <Coins size={32} className="text-brand-500" />,
          defaultYears: 15,
          defaultAmount: 3000000,
        };
      case "sabbatical":
        return {
          title: "Sabbatical Planning",
          description: "Save for your career break",
          icon: <Briefcase size={32} className="text-brand-500" />,
          defaultYears: 3,
          defaultAmount: 1000000,
        };
      case "family":
        return {
          title: "Family Planning",
          description: "Save for your family's future needs",
          icon: <Users size={32} className="text-brand-500" />,
          defaultYears: 10,
          defaultAmount: 2000000,
        };
      case "child":
        return {
          title: "Child Education Planning",
          description: "Save for your child's education",
          icon: <Baby size={32} className="text-brand-500" />,
          defaultYears: 15,
          defaultAmount: 3000000,
        };
      default:
        return {
          title: "Custom Goal Planning",
          description: "Plan for your custom financial goal",
          icon: <Grid size={32} className="text-brand-500" />,
          defaultYears: 5,
          defaultAmount: 1000000,
        };
    }
  };

  const goalInfo = getGoalInfo();

  // Set default values based on goal type
  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      targetAmount: goalInfo.defaultAmount,
      years: goalInfo.defaultYears,
    }));
  }, [goalType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const calculateGoal = () => {
    // Future value calculation with inflation
    const inflationAdjustedTargetAmount = formData.targetAmount * 
      Math.pow(1 + formData.inflationRate / 100, formData.years);
    
    // Monthly SIP calculation
    const monthlyRate = formData.expectedReturn / 100 / 12;
    const months = formData.years * 12;
    
    // Formula to calculate monthly SIP required
    const monthlySIP = (inflationAdjustedTargetAmount - formData.currentAmount) / 
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 / (1 + monthlyRate));
    
    setResult({
      futureValue: Math.round(inflationAdjustedTargetAmount),
      monthlySIP: Math.round(monthlySIP),
    });
    
    setFormStep(2);
  };

  const saveGoal = () => {
    // In a real application, this would save to a database
    toast({
      title: "Goal Saved Successfully",
      description: `Your ${goalInfo.title} has been added to your financial plan.`,
    });
    navigate("/dashboard");
  };

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>
        
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="bg-brand-50 rounded-t-lg">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-sm">
                {goalInfo.icon}
              </div>
              <div>
                <CardTitle className="text-2xl">{goalInfo.title}</CardTitle>
                <CardDescription>{goalInfo.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            {formStep === 1 ? (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="currentAmount">Current Savings (₹)</Label>
                  <Input
                    id="currentAmount"
                    name="currentAmount"
                    type="number"
                    value={formData.currentAmount}
                    onChange={handleInputChange}
                    className="finance-input"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                    <Input
                      id="targetAmount-value"
                      name="targetAmount"
                      type="number"
                      value={formData.targetAmount}
                      onChange={handleInputChange}
                      className="w-32 text-right"
                    />
                  </div>
                  <Slider
                    id="targetAmount"
                    min={100000}
                    max={10000000}
                    step={100000}
                    value={[formData.targetAmount]}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, targetAmount: value[0] }))
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹1L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="years">Time Horizon (Years)</Label>
                    <Input
                      id="years-value"
                      name="years"
                      type="number"
                      value={formData.years}
                      onChange={handleInputChange}
                      className="w-32 text-right"
                    />
                  </div>
                  <Slider
                    id="years"
                    min={1}
                    max={30}
                    value={[formData.years]}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, years: value[0] }))
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="inflationRate">Expected Inflation Rate (% p.a.)</Label>
                    <Input
                      id="inflationRate-value"
                      name="inflationRate"
                      type="number"
                      value={formData.inflationRate}
                      onChange={handleInputChange}
                      className="w-32 text-right"
                    />
                  </div>
                  <Slider
                    id="inflationRate"
                    min={0}
                    max={12}
                    step={0.5}
                    value={[formData.inflationRate]}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, inflationRate: value[0] }))
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>12%</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="expectedReturn">Expected Return Rate (% p.a.)</Label>
                    <Input
                      id="expectedReturn-value"
                      name="expectedReturn"
                      type="number"
                      value={formData.expectedReturn}
                      onChange={handleInputChange}
                      className="w-32 text-right"
                    />
                  </div>
                  <Slider
                    id="expectedReturn"
                    min={1}
                    max={20}
                    step={0.5}
                    value={[formData.expectedReturn]}
                    onValueChange={(value) => 
                      setFormData(prev => ({ ...prev, expectedReturn: value[0] }))
                    }
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>
                
                <Button 
                  onClick={calculateGoal}
                  className="finance-button w-full"
                >
                  Calculate Plan
                </Button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Your {goalInfo.title} Plan</h3>
                  <p className="text-gray-600">Based on your inputs, here's what you need to achieve your goal</p>
                </div>
                
                <div className="bg-finance-lightGold p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg border border-amber-100">
                      <p className="text-gray-600 text-sm mb-1">Future Value (With Inflation)</p>
                      <p className="text-3xl font-bold text-gray-900">₹{result?.futureValue.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Target amount adjusted for inflation over {formData.years} years
                      </p>
                    </div>
                    
                    <div className="bg-finance-lightBlue p-5 rounded-lg border border-blue-100">
                      <p className="text-gray-600 text-sm mb-1">Monthly SIP Required</p>
                      <p className="text-3xl font-bold text-brand-600">₹{result?.monthlySIP.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Systematic investment needed each month
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Investment Progress</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Current Savings</span>
                      <span className="text-sm font-medium">
                        ₹{formData.currentAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(formData.currentAmount / (result?.futureValue || 1)) * 100} 
                      className="h-2 mb-2" 
                    />
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">
                        {Math.round((formData.currentAmount / (result?.futureValue || 1)) * 100)}% of goal
                      </span>
                      <span className="text-gray-500">
                        ₹{result?.futureValue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Investment Summary</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Investment</p>
                      <p className="text-lg font-semibold">
                        ₹{((result?.monthlySIP || 0) * formData.years * 12).toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Expected Returns</p>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{((result?.futureValue || 0) - (result?.monthlySIP || 0) * formData.years * 12).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setFormStep(1)}
                    className="flex-1"
                  >
                    Modify Plan
                  </Button>
                  <Button 
                    onClick={saveGoal}
                    className="finance-button flex-1"
                  >
                    Save Goal
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default GoalPlanner;
