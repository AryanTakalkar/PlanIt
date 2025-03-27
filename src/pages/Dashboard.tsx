
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  Wallet,
  PiggyBank,
  BarChart3,
  DollarSign,
  Target,
  Calendar,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import GoalSelection from "@/components/GoalSelection";
import RetirementCalculator from "@/components/RetirementCalculator";
import StockMarket from "@/components/StockMarket";

const Dashboard = () => {
  const { user } = useAuth();
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  const [showRetirementCalculator, setShowRetirementCalculator] = useState(false);

  // Mock data for the dashboard
  const portfolioSummary = {
    totalInvestment: 1250000,
    currentValue: 1520000,
    returns: 270000,
    returnPercentage: 21.6,
  };

  const assetAllocation = [
    { name: "Equity", value: 65 },
    { name: "Debt", value: 25 },
    { name: "Gold", value: 5 },
    { name: "Cash", value: 5 },
  ];

  const goals = [
    { name: "Retirement", progress: 42, target: 10000000, current: 4200000 },
    { name: "House Down Payment", progress: 78, target: 1500000, current: 1170000 },
    { name: "Child's Education", progress: 25, target: 4000000, current: 1000000 },
  ];

  const upcomingSips = [
    { name: "HDFC Mid-Cap Opportunities Fund", amount: 10000, date: "5th Jul" },
    { name: "Axis Long Term Equity Fund", amount: 5000, date: "10th Jul" },
    { name: "SBI Small Cap Fund", amount: 3000, date: "15th Jul" },
  ];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-gray-600">
            Here's an overview of your financial portfolio
          </p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    ₹{portfolioSummary.totalInvestment.toLocaleString()}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Current Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    ₹{portfolioSummary.currentValue.toLocaleString()}
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                  <PiggyBank className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{portfolioSummary.returns.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="font-medium">{portfolioSummary.returnPercentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Monthly SIP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    ₹18,000
                  </p>
                </div>
                <div className="h-9 w-9 rounded-full bg-finance-lightGold text-amber-600 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stock Market Section */}
            <StockMarket />

            {/* Goals Section */}
            <Card className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">Your Financial Goals</CardTitle>
                  <CardDescription>Track progress towards your targets</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  className="rounded-full" 
                  size="icon"
                  onClick={() => setShowGoalSelector(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mr-3">
                            <Target className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{goal.name}</h3>
                            <div className="text-sm text-gray-500">
                              <span className="text-brand-500 font-medium">₹{goal.current.toLocaleString()}</span> of ₹{goal.target.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{goal.progress}%</span>
                        </div>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}

                  <Button 
                    variant="outline" 
                    onClick={() => setShowGoalSelector(true)}
                    className="w-full border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-600"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add New Goal
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Assets Allocation */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Asset Allocation</CardTitle>
                <CardDescription>
                  How your portfolio is diversified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-center h-48">
                      <div className="relative w-40 h-40">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-lg font-medium text-gray-900">Diversified</p>
                            <p className="text-sm text-gray-500">Portfolio</p>
                          </div>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f0f0f0"
                            strokeWidth="20"
                          />
                          {/* Equity slice */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#0066ff"
                            strokeWidth="20"
                            strokeDasharray={`${65 * 2.51} ${100 * 2.51}`}
                            strokeDashoffset="0"
                            transform="rotate(-90 50 50)"
                          />
                          {/* Debt slice */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#4E97FD"
                            strokeWidth="20"
                            strokeDasharray={`${25 * 2.51} ${100 * 2.51}`}
                            strokeDashoffset={`-${65 * 2.51}`}
                            transform="rotate(-90 50 50)"
                          />
                          {/* Gold slice */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#FFC107"
                            strokeWidth="20"
                            strokeDasharray={`${5 * 2.51} ${100 * 2.51}`}
                            strokeDashoffset={`-${(65 + 25) * 2.51}`}
                            transform="rotate(-90 50 50)"
                          />
                          {/* Cash slice */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#9CA3AF"
                            strokeWidth="20"
                            strokeDasharray={`${5 * 2.51} ${100 * 2.51}`}
                            strokeDashoffset={`-${(65 + 25 + 5) * 2.51}`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="space-y-4">
                      {assetAllocation.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`h-3 w-3 rounded-full mr-2 ${
                                asset.name === "Equity"
                                  ? "bg-brand-500"
                                  : asset.name === "Debt"
                                  ? "bg-brand-300"
                                  : asset.name === "Gold"
                                  ? "bg-finance-gold"
                                  : "bg-gray-400"
                              }`}
                            />
                            <span>{asset.name}</span>
                          </div>
                          <span className="font-medium">{asset.value}%</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="mt-6 border-brand-500 text-brand-500 hover:bg-brand-50"
                    >
                      Rebalance Portfolio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>
                  Shortcuts to common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none py-6 px-6 hover:bg-gray-50"
                    onClick={() => setShowRetirementCalculator(true)}
                  >
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-finance-lightBlue text-brand-500 flex items-center justify-center mr-3">
                        <PiggyBank className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">Retirement Calculator</h3>
                        <p className="text-sm text-gray-500">Plan for a secure future</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
                  </Button>

                  <Link
                    to="/sip-calculator"
                    className="block"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-none py-6 px-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-finance-lightGold text-amber-600 flex items-center justify-center mr-3">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">SIP Calculator</h3>
                          <p className="text-sm text-gray-500">Estimate your returns</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
                    </Button>
                  </Link>

                  <Link
                    to="/tax-planner"
                    className="block"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-none py-6 px-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-green-50 text-green-500 flex items-center justify-center mr-3">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">Tax Planning</h3>
                          <p className="text-sm text-gray-500">Optimize your tax savings</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
                    </Button>
                  </Link>

                  <Link
                    to="/book-appointment"
                    className="block"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-none py-6 px-6 hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">Book Consultation</h3>
                          <p className="text-sm text-gray-500">Get expert advice</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 ml-auto text-gray-400" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming SIPs */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Upcoming SIPs</CardTitle>
                <CardDescription>
                  Scheduled investments this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSips.map((sip, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mr-3">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">{sip.name}</h3>
                          <p className="text-xs text-gray-500">{sip.date}</p>
                        </div>
                      </div>
                      <div className="font-medium">₹{sip.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6"
                >
                  Manage SIPs
                </Button>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="shadow-card bg-finance-lightBlue border-none">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-white/80 text-brand-500 flex items-center justify-center mx-auto">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Need Financial Guidance?</h3>
                  <p className="text-gray-600">
                    Schedule a consultation with our expert financial advisors for personalized advice.
                  </p>
                  <Link to="/book-appointment">
                    <Button className="w-full bg-brand-500 hover:bg-brand-600 mt-2">
                      Book an Appointment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Goal Selection Dialog */}
      <GoalSelection 
        open={showGoalSelector} 
        onOpenChange={setShowGoalSelector} 
      />

      {/* Retirement Calculator Dialog */}
      <RetirementCalculator
        open={showRetirementCalculator}
        onOpenChange={setShowRetirementCalculator}
      />
    </PageWrapper>
  );
};

export default Dashboard;
