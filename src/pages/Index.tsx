
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";
import GoalSelection from "@/components/GoalSelection";
import { 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  CreditCard, 
  LineChart, 
  PiggyBank, 
  CalendarCheck, 
  Target 
} from "lucide-react";

const Index = () => {
  const [showGoalSelector, setShowGoalSelector] = useState(false);
  
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-1 bg-brand-500 rounded-full"></div>
                <p className="text-brand-600 font-medium">Your Financial Future Starts Here</p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
                Smart Financial Planning for a Secure Future
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Set your financial goals, create personalized investment plans, and optimize your taxes with our expert-backed tools and guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="h-14 px-8 text-base font-medium bg-brand-500 hover:bg-brand-600 shadow-button hover:shadow-button-hover"
                  onClick={() => setShowGoalSelector(true)}
                >
                  Start Planning <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/book-appointment">
                  <Button variant="outline" className="h-14 px-8 text-base font-medium border-brand-500 text-brand-500 hover:bg-brand-50">
                    Talk to an Expert
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute -top-4 -left-4 h-64 w-64 bg-brand-50 rounded-full z-0"></div>
                <div className="absolute -bottom-4 -right-4 h-48 w-48 bg-finance-lightGold rounded-full z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1011&ixlib=rb-4.0.3"
                  alt="Financial Planning" 
                  className="rounded-2xl shadow-elegant relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Everything You Need for Financial Success
            </h2>
            <p className="text-xl text-gray-600">
              Our comprehensive suite of financial planning tools helps you achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-10 w-10" />,
                title: "Goal-Based Planning",
                description: "Set specific financial goals like retirement, education, home purchase and more with personalized roadmaps to achieve them."
              },
              {
                icon: <TrendingUp className="h-10 w-10" />,
                title: "SIP Calculator",
                description: "Calculate and visualize how your systematic investments grow over time with our intuitive SIP calculator."
              },
              {
                icon: <Shield className="h-10 w-10" />,
                title: "Tax Optimization",
                description: "Discover the best tax-saving investment options based on your income and financial situation."
              },
              {
                icon: <CalendarCheck className="h-10 w-10" />,
                title: "Expert Consultation",
                description: "Book one-on-one sessions with our certified financial advisors for personalized guidance."
              },
              {
                icon: <LineChart className="h-10 w-10" />,
                title: "Portfolio Tracking",
                description: "Monitor your investments in real-time and get insights on performance and rebalancing opportunities."
              },
              {
                icon: <PiggyBank className="h-10 w-10" />,
                title: "Retirement Planning",
                description: "Ensure a comfortable retirement with our specialized planning tools and investment strategies."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-xl glass-card-hover"
              >
                <div className="h-14 w-14 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link 
                  to={feature.title === "Goal-Based Planning" 
                    ? "#"
                    : feature.title === "SIP Calculator" 
                      ? "/sip-calculator"
                      : feature.title === "Tax Optimization"
                        ? "/tax-planner"
                        : feature.title === "Expert Consultation"
                          ? "/book-appointment"
                          : feature.title === "Portfolio Tracking"
                            ? "/dashboard"
                            : "/goal-planner?type=retirement"}
                  className={`text-brand-500 font-medium inline-flex items-center ${feature.title === "Goal-Based Planning" ? "cursor-pointer" : ""}`}
                  onClick={feature.title === "Goal-Based Planning" ? () => setShowGoalSelector(true) : undefined}
                >
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Actions */}
      <section className="py-20 bg-brand-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Suggested Next Steps
            </h2>
            <p className="text-xl opacity-90">
              Start your financial journey with these recommended actions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create your first goal</h3>
              <p className="text-white/80 mb-6">
                Define your financial objectives and get a customized plan to achieve them.
              </p>
              <Button 
                className="finance-button-gold w-full"
                onClick={() => setShowGoalSelector(true)}
              >
                Initiate
              </Button>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick SIP</h3>
              <p className="text-white/80 mb-6">
                Calculate how your systematic investments can grow over time with our SIP calculator.
              </p>
              <Link to="/sip-calculator" className="block">
                <Button className="finance-button-gold w-full">
                  Start SIP
                </Button>
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all duration-300">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Start your tax saving</h3>
              <p className="text-white/80 mb-6">
                Explore tax-efficient investment options and maximize your savings with our tax planner.
              </p>
              <Link to="/tax-planner" className="block">
                <Button className="finance-button-gold w-full">
                  Save Tax
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who've transformed their financial future with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "FinPlanner helped me create a solid retirement plan. Their easy-to-use tools and expert guidance made financial planning less intimidating.",
                name: "Amit Sharma",
                role: "Software Engineer"
              },
              {
                quote: "I've tried multiple financial planning apps, but FinPlanner stands out with its comprehensive approach. The tax planning feature alone saved me lakhs!",
                name: "Priya Patel",
                role: "Business Owner"
              },
              {
                quote: "The consultations with financial experts were game-changing. They helped me restructure my investments and set up an education fund for my children.",
                name: "Rahul Verma",
                role: "Doctor"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-card">
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-finance-gold">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4">
                    <div className="h-full w-full rounded-full flex items-center justify-center bg-brand-50 text-brand-500 font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-brand-500 to-brand-600 rounded-3xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-3/5 p-10 md:p-14 text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  Ready to Take Control of Your Financial Future?
                </h2>
                <p className="text-xl opacity-90 mb-8">
                  Create a personalized financial plan today and start your journey towards financial freedom.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="h-14 px-8 text-base font-medium bg-white text-brand-600 hover:bg-gray-100"
                    onClick={() => setShowGoalSelector(true)}
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Link to="/book-appointment">
                    <Button variant="outline" className="h-14 px-8 text-base font-medium border-white text-white hover:bg-white/10">
                      Talk to an Expert
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-2/5 relative hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
                  alt="Financial Planning" 
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goal Selection Dialog */}
      <GoalSelection 
        open={showGoalSelector} 
        onOpenChange={setShowGoalSelector} 
      />
    </PageWrapper>
  );
};

export default Index;
