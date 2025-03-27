
import { useEffect } from "react";
import PageWrapper from "@/components/PageWrapper";
import AppointmentBooking from "@/components/AppointmentBooking";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
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
          <h1 className="text-3xl font-bold mb-4">Book a Consultation</h1>
          <p className="text-gray-600">
            Schedule a one-on-one session with our financial experts to get personalized
            guidance for your financial goals and investment strategies.
          </p>
        </div>
        
        <AppointmentBooking />
        
        <div className="max-w-3xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="h-12 w-12 rounded-full bg-finance-lightBlue text-brand-500 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5.2 22h13.6a2 2 0 0 0 2-2.5l-1.4-8a2 2 0 0 0-2-1.5H4.6a2 2 0 0 0-2 1.5l-1.4 8a2 2 0 0 0 2 2.5Z"></path>
                <path d="M9.5 9V6.5a3.5 3.5 0 0 1 7 0V9"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Personalized Advice</h3>
            <p className="text-gray-600">
              Get customized financial guidance based on your unique goals, risk tolerance, and financial situation.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="h-12 w-12 rounded-full bg-finance-lightGold text-amber-600 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11h6"></path>
                <path d="M12 8v6"></path>
                <path d="M5.7 19.3 4 21"></path>
                <path d="m20 21-1.7-1.7"></path>
                <path d="M15 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"></path>
                <path d="M17.8 14a6 6 0 1 0-11.6 0"></path>
                <path d="M20 21v-8"></path>
                <path d="M4 13v8"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Consultants</h3>
            <p className="text-gray-600">
              Our team of certified financial advisors have years of experience in various aspects of financial planning.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-card">
            <div className="h-12 w-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 2 1.286 1.288L12 1l2.714 2.288L16 2l4 4-1.286 1.288L20 10l-2.714 2.288L18 14l-4 4-1.286-1.288L10 19l-2.714-2.288L6 18l-4-4 1.286-1.288L2 10l2.714-2.288L4 6Z"></path>
                <path d="M10.5 10.5a1.8 1.8 0 0 0 2.5 0c.62-.643.572-1.695-.125-2.25a1.55 1.55 0 0 0-2.25.125 1.8 1.8 0 0 0 0 2.5L12 12.3l1.375-1.425"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Comprehensive Planning</h3>
            <p className="text-gray-600">
              From retirement planning to tax optimization, get help with all aspects of your financial journey.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BookAppointment;
