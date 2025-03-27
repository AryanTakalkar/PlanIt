
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Bike, 
  Building2, 
  Car, 
  Home, 
  BookOpen, 
  Plane, 
  Users, 
  Coins, 
  Briefcase, 
  CalendarClock, 
  Baby, 
  Grid 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import GoalCard from "./GoalCard";

interface GoalSelectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type GoalType = 
  | "retirement" 
  | "home" 
  | "education" 
  | "car" 
  | "bike" 
  | "business" 
  | "travel" 
  | "wedding" 
  | "wealth" 
  | "sabbatical" 
  | "family" 
  | "child" 
  | "other";

const GoalSelection = ({ open, onOpenChange }: GoalSelectionProps) => {
  const navigate = useNavigate();
  
  const handleGoalSelect = (goalType: GoalType) => {
    onOpenChange(false);
    navigate(`/goal-planner?type=${goalType}`);
  };

  const goals = [
    { type: "bike" as GoalType, title: "Bike Goal", icon: <Bike size={32} /> },
    { type: "business" as GoalType, title: "Business Goal", icon: <Briefcase size={32} /> },
    { type: "car" as GoalType, title: "Car Goal", icon: <Car size={32} /> },
    { type: "home" as GoalType, title: "House Planning", icon: <Home size={32} /> },
    { type: "education" as GoalType, title: "Your Own Education", icon: <BookOpen size={32} /> },
    { type: "travel" as GoalType, title: "Travel Planning", icon: <Plane size={32} /> },
    { type: "wedding" as GoalType, title: "Wedding Planning", icon: <Users size={32} /> },
    { type: "wealth" as GoalType, title: "Wealth Goal", icon: <Coins size={32} /> },
    { type: "retirement" as GoalType, title: "Retirement Goal", icon: <CalendarClock size={32} /> },
    { type: "sabbatical" as GoalType, title: "Sabbatical Goal", icon: <Briefcase size={32} /> },
    { type: "family" as GoalType, title: "Family Planning", icon: <Users size={32} /> },
    { type: "child" as GoalType, title: "Child Education Goal", icon: <Baby size={32} /> },
    { type: "other" as GoalType, title: "Other Goal", icon: <Grid size={32} /> },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">New Goal</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Select the type of financial goal you want to create
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {goals.map((goal) => (
            <GoalCard
              key={goal.type}
              title={goal.title}
              icon={goal.icon}
              onClick={() => handleGoalSelect(goal.type)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoalSelection;
