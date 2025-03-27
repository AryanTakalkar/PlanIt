
import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ArrowUp, ArrowDown, RefreshCw, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface StockHolding {
  id: string;
  symbol: string;
  exchange: string;
  company_name: string;
  quantity: number;
  average_price: number;
  last_price: number;
  current_value: number;
  profit_loss: number;
  profit_loss_percentage: number;
}

interface MarketData {
  symbol: string;
  currentPrice: number;
  change: number;
  volume: number;
  high: number;
  low: number;
  timestamp: string;
}

interface DematConnection {
  id: string;
  provider: string;
  is_active: boolean;
}

const StockMarket = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([
    'NIFTY', 'SENSEX', 'RELIANCE', 'TCS', 'HDFCBANK', 'INFY'
  ]);

  // Fetch user's demat connections
  const { 
    data: connections, 
    isLoading: isLoadingConnections, 
    refetch: refetchConnections
  } = useQuery({
    queryKey: ['demat-connections', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('demat_connections')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);
      
      if (error) {
        console.error('Error fetching demat connections:', error);
        throw error;
      }
      
      return data as DematConnection[];
    },
    enabled: !!user,
  });

  // Fetch user's portfolio holdings
  const { 
    data: holdings, 
    isLoading: isLoadingHoldings, 
    refetch: refetchHoldings
  } = useQuery({
    queryKey: ['stock-holdings', user?.id, connections],
    queryFn: async () => {
      if (!user || !connections || connections.length === 0) return [];
      
      const { data, error } = await supabase
        .from('stock_holdings')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) {
        console.error('Error fetching stock holdings:', error);
        throw error;
      }
      
      return data as StockHolding[];
    },
    enabled: !!user && !!connections && connections.length > 0,
  });

  // Fetch market data for watchlist symbols
  const { 
    data: marketData, 
    isLoading: isLoadingMarketData, 
    refetch: refetchMarketData
  } = useQuery({
    queryKey: ['market-data', watchlistSymbols],
    queryFn: async () => {
      if (!watchlistSymbols.length) return [];
      
      try {
        const response = await supabase.functions.invoke('broker-connect', {
          body: {
            action: 'fetch-market-data',
            data: { symbols: watchlistSymbols }
          }
        });
        
        if (response.error) throw new Error(response.error.message);
        return response.data.marketData as MarketData[];
      } catch (error) {
        console.error('Error fetching market data:', error);
        throw error;
      }
    },
    enabled: watchlistSymbols.length > 0,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Calculate portfolio summary
  const portfolioSummary = holdings?.reduce((summary, holding) => {
    return {
      totalInvestment: summary.totalInvestment + (holding.average_price * holding.quantity),
      currentValue: summary.currentValue + holding.current_value,
      profitLoss: summary.profitLoss + holding.profit_loss
    };
  }, { totalInvestment: 0, currentValue: 0, profitLoss: 0 }) || { totalInvestment: 0, currentValue: 0, profitLoss: 0 };

  const profitLossPercentage = portfolioSummary.totalInvestment > 0 
    ? (portfolioSummary.profitLoss / portfolioSummary.totalInvestment) * 100
    : 0;

  // Handle refresh of data
  const handleRefresh = () => {
    refetchConnections();
    refetchHoldings();
    refetchMarketData();
    toast.success("Market data refreshed");
  };

  // Handle connection to a new demat account
  const handleConnectDemat = async (provider: string, apiKey: string, apiSecret: string) => {
    try {
      const response = await supabase.functions.invoke('broker-connect', {
        body: {
          action: 'connect',
          provider: provider,
          data: {
            apiKey,
            apiSecret
          }
        }
      });
      
      if (response.error) throw new Error(response.error.message);
      
      toast.success(`Connected to ${provider} successfully`);
      setIsConnectModalOpen(false);
      refetchConnections();
      refetchHoldings();
    } catch (error) {
      console.error('Error connecting to demat account:', error);
      toast.error(`Failed to connect: ${error.message}`);
    }
  };

  // Setup real-time updates for stock holdings
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('stock-holdings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stock_holdings',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          refetchHoldings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refetchHoldings]);

  // If user is not authenticated, show connection message
  if (!isAuthenticated) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Stock Market</CardTitle>
          <CardDescription>Track your investments and market movements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-yellow-500" />
            <h3 className="text-lg font-medium">Login Required</h3>
            <p className="text-sm text-gray-500 max-w-md">
              Please log in to view your portfolio and connect your demat account for real-time stock tracking.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Stock Market</CardTitle>
          <CardDescription>Track your investments and market movements</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh}
          className="h-8 w-8"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="watchlist">Market Watch</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portfolio" className="space-y-6">
            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Investment</div>
                  {isLoadingHoldings ? (
                    <Skeleton className="h-7 w-24 mt-1" />
                  ) : (
                    <div className="text-xl font-bold">₹{portfolioSummary.totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Current Value</div>
                  {isLoadingHoldings ? (
                    <Skeleton className="h-7 w-24 mt-1" />
                  ) : (
                    <div className="text-xl font-bold">₹{portfolioSummary.currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-gray-500">Profit/Loss</div>
                  {isLoadingHoldings ? (
                    <Skeleton className="h-7 w-24 mt-1" />
                  ) : (
                    <div className={`text-xl font-bold flex items-center ${portfolioSummary.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {portfolioSummary.profitLoss >= 0 ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      ₹{Math.abs(portfolioSummary.profitLoss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      <span className="text-sm ml-1">({profitLossPercentage.toFixed(2)}%)</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Holdings Table */}
            {isLoadingConnections ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : connections?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-yellow-500" />
                <h3 className="text-lg font-medium">No Demat Account Connected</h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Connect your demat account to see your real portfolio holdings and track your investments in real-time.
                </p>
                <Button 
                  onClick={() => setIsConnectModalOpen(true)}
                  className="mt-2"
                >
                  Connect Demat Account
                </Button>
              </div>
            ) : isLoadingHoldings ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : holdings?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-yellow-500" />
                <h3 className="text-lg font-medium">No Holdings Found</h3>
                <p className="text-sm text-gray-500 max-w-md">
                  You don't have any stock holdings in your connected demat account yet.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Stock</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Avg. Price</TableHead>
                      <TableHead className="text-right">LTP</TableHead>
                      <TableHead className="text-right">Current Value</TableHead>
                      <TableHead className="text-right">P&L</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {holdings?.map((holding) => (
                      <TableRow key={holding.id}>
                        <TableCell>
                          <div className="font-medium">{holding.symbol}</div>
                          <div className="text-xs text-gray-500">{holding.company_name}</div>
                        </TableCell>
                        <TableCell className="text-right">{holding.quantity}</TableCell>
                        <TableCell className="text-right">₹{holding.average_price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">₹{holding.last_price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">₹{holding.current_value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center justify-end ${holding.profit_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {holding.profit_loss >= 0 ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            <span>₹{Math.abs(holding.profit_loss).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                            <span className="text-xs ml-1">({holding.profit_loss_percentage.toFixed(2)}%)</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* Connected Accounts */}
            {connections && connections.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Connected Accounts</h3>
                <div className="flex flex-wrap gap-2">
                  {connections.map((connection) => (
                    <div key={connection.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100">
                      {connection.provider}
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-7"
                    onClick={() => setIsConnectModalOpen(true)}
                  >
                    + Add Account
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="watchlist">
            {isLoadingMarketData ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">LTP</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead className="text-right">High</TableHead>
                      <TableHead className="text-right">Low</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketData?.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell className="text-right">₹{stock.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className={`text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="flex items-center justify-end">
                            {stock.change >= 0 ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(stock.change).toFixed(2)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{stock.volume.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-right">₹{stock.high.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">₹{stock.low.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Connect Demat Modal */}
        {isConnectModalOpen && (
          <ConnectDematModal 
            isOpen={isConnectModalOpen} 
            onClose={() => setIsConnectModalOpen(false)} 
            onConnect={handleConnectDemat} 
          />
        )}
      </CardContent>
    </Card>
  );
};

// Connect Demat Account Modal Component
interface ConnectDematModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (provider: string, apiKey: string, apiSecret: string) => void;
}

const ConnectDematModal = ({ isOpen, onClose, onConnect }: ConnectDematModalProps) => {
  const [provider, setProvider] = useState('zerodha');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onConnect(provider, apiKey, apiSecret);
    } catch (error) {
      console.error('Error connecting account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Connect Demat Account</h2>
        <p className="text-sm text-gray-600 mb-6">
          Connect your demat account to track your investments in real-time. Your credentials are encrypted and securely stored.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="provider" className="block text-sm font-medium mb-1">
              Select Broker
            </label>
            <select 
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500"
            >
              <option value="zerodha">Zerodha</option>
              <option value="upstox">Upstox</option>
              <option value="groww">Groww</option>
              <option value="angelone">Angel One</option>
              <option value="icici">ICICI Direct</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
              API Key
            </label>
            <input 
              id="apiKey"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500"
              placeholder="Enter your API key"
              required
            />
          </div>
          
          <div>
            <label htmlFor="apiSecret" className="block text-sm font-medium mb-1">
              API Secret
            </label>
            <input 
              id="apiSecret"
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500"
              placeholder="Enter your API secret"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockMarket;
