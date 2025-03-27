
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface GoalCardProps {
  title: string;
  icon: ReactNode;
  onClick?: () => void;
  to?: string;
}

const GoalCard = ({ title, icon, onClick, to }: GoalCardProps) => {
  const content = (
    <div className="goal-card p-6 flex flex-col items-center justify-between h-full">
      <div className="w-16 h-16 flex items-center justify-center mb-4 text-brand-500 floating-icon">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">{title}</h3>
      <Button 
        className="finance-button-gold w-full"
        onClick={onClick}
      >
        Let's Start
      </Button>
    </div>
  );

  if (to) {
    return <Link to={to} className="block h-full">{content}</Link>;
  }

  return content;
};

export default GoalCard;
