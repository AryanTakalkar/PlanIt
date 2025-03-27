
import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, Lock, Shield, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const ProfileSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePersonalInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would update the user's profile in the database
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would update the user's password in the database
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
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
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
          
          <Tabs defaultValue="personal-info" className="space-y-8">
            <TabsList className="grid grid-cols-4 max-w-2xl">
              <TabsTrigger value="personal-info" className="flex items-center">
                <User className="h-4 w-4 mr-2" /> Personal Info
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Lock className="h-4 w-4 mr-2" /> Security
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center">
                <Shield className="h-4 w-4 mr-2" /> Privacy
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal-info">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Profile Picture</Label>
                      <div className="flex items-center space-x-4">
                        <div className="h-20 w-20 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center text-xl font-semibold overflow-hidden">
                          {user?.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            personalInfo.name.charAt(0)
                          )}
                        </div>
                        <Button variant="outline">Change Photo</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={personalInfo.name}
                          onChange={handlePersonalInfoChange}
                          className="finance-input"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="finance-input"
                          disabled
                        />
                        <p className="text-xs text-gray-500">
                          Email cannot be changed for security reasons
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="finance-input"
                          placeholder="+91 9876543210"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={personalInfo.address}
                          onChange={handlePersonalInfoChange}
                          className="finance-input"
                          placeholder="Your address"
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="finance-button">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your password and account security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Change Password</h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          className="finance-input"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          className="finance-input"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          className="finance-input"
                        />
                      </div>
                      
                      <Button type="submit" className="finance-button">
                        Update Password
                      </Button>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                      <h3 className="font-medium text-lg">Account Actions</h3>
                      
                      <div className="flex flex-col space-y-4">
                        <Button 
                          variant="outline" 
                          type="button"
                          onClick={handleLogout}
                          className="border-red-500 text-red-500 hover:bg-red-50 justify-start"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                          </svg>
                          Sign Out
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          type="button"
                          className="border-gray-500 text-gray-500 hover:bg-gray-50 justify-start"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                            <line x1="5" y1="5" x2="19" y2="19"></line>
                          </svg>
                          Deactivate Account
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Manage how your information is handled and stored
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Data Sharing</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">Analytics Tracking</h4>
                          <p className="text-sm text-gray-600">
                            Allow us to collect analytics data to improve our services
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Disable</Button>
                          <Button size="sm">Enable</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">Personalized Recommendations</h4>
                          <p className="text-sm text-gray-600">
                            Receive investment recommendations based on your activity
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Disable</Button>
                          <Button size="sm">Enable</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Third-Party Data Sharing</h4>
                          <p className="text-sm text-gray-600">
                            Share your data with our trusted partners
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Disable</Button>
                          <Button size="sm">Enable</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Data Management</h3>
                      
                      <div className="flex flex-col space-y-4">
                        <Button variant="outline" className="justify-start">
                          Request Data Export
                        </Button>
                        
                        <Button variant="outline" className="justify-start text-red-500 border-red-500 hover:bg-red-50">
                          Delete All My Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">Account Updates</h4>
                          <p className="text-sm text-gray-600">
                            Important updates about your account and security
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Off</Button>
                          <Button size="sm">On</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">Investment Updates</h4>
                          <p className="text-sm text-gray-600">
                            Updates about your investments and portfolios
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Off</Button>
                          <Button size="sm">On</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">Goal Progress</h4>
                          <p className="text-sm text-gray-600">
                            Updates on your financial goal progress
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Off</Button>
                          <Button size="sm">On</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Marketing & Promotions</h4>
                          <p className="text-sm text-gray-600">
                            Newsletters, offers, and product updates
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Off</Button>
                          <Button size="sm">On</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg">Push Notifications</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <h4 className="font-medium">SIP Reminders</h4>
                          <p className="text-sm text-gray-600">
                            Reminders about upcoming SIP payments
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Off</Button>
                          <Button size="sm">On</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <h4 className="font-medium">Market Updates</h4>
                          <p className="text-sm text-gray-600">
                            Important updates about market movements
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">Off</Button>
                          <Button size="sm">On</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="finance-button">
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProfileSettings;
