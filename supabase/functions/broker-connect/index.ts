
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Get the user based on the JWT token
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", details: userError?.message }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const { action, provider, data } = await req.json();

    console.log(`Broker connect request: ${action} for provider ${provider}`);

    if (action === "connect") {
      // Handle initial connection to broker
      return await handleConnect(supabaseClient, user.id, provider, data);
    } else if (action === "fetch-holdings") {
      // Fetch holdings from the broker
      return await fetchHoldings(supabaseClient, user.id, provider);
    } else if (action === "fetch-market-data") {
      // Fetch market data for specific symbols
      return await fetchMarketData(data.symbols);
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error in broker-connect function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

// Handle connecting to a broker and storing credentials
async function handleConnect(supabaseClient, userId, provider, connectionData) {
  try {
    // In a real implementation, we would validate the credentials with the broker's API
    // For now, we'll just save the connection information
    
    const { data, error } = await supabaseClient
      .from("demat_connections")
      .insert({
        user_id: userId,
        provider: provider,
        api_key: connectionData.apiKey,
        api_secret: connectionData.apiSecret,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    // Simulate fetching initial holdings from the broker API
    await fetchAndStoreHoldings(supabaseClient, userId, data.id, provider, connectionData);

    return new Response(
      JSON.stringify({ success: true, connectionId: data.id }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error connecting to broker:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// Fetch holdings from broker API and store in our database
async function fetchAndStoreHoldings(supabaseClient, userId, connectionId, provider, connectionData) {
  try {
    // In a real implementation, we would call the broker's API with the stored credentials
    // For now, we'll create some sample holdings based on common Indian stocks
    
    const sampleHoldings = getSampleIndianStockHoldings();
    
    // Store the holdings in our database
    for (const holding of sampleHoldings) {
      await supabaseClient
        .from("stock_holdings")
        .upsert({
          user_id: userId,
          connection_id: connectionId,
          symbol: holding.symbol,
          exchange: holding.exchange,
          company_name: holding.companyName,
          quantity: holding.quantity,
          average_price: holding.averagePrice,
          last_price: holding.lastPrice,
          current_value: holding.lastPrice * holding.quantity,
          profit_loss: (holding.lastPrice - holding.averagePrice) * holding.quantity,
          profit_loss_percentage: ((holding.lastPrice - holding.averagePrice) / holding.averagePrice) * 100,
        })
        .select();
    }
    
    return true;
  } catch (error) {
    console.error("Error fetching holdings:", error);
    return false;
  }
}

// Fetch holdings for a specific user and provider
async function fetchHoldings(supabaseClient, userId, provider) {
  try {
    // Get the connection for this provider
    const { data: connection, error: connectionError } = await supabaseClient
      .from("demat_connections")
      .select("*")
      .eq("user_id", userId)
      .eq("provider", provider)
      .eq("is_active", true)
      .single();
    
    if (connectionError || !connection) {
      return new Response(
        JSON.stringify({ error: "No active connection found for this provider" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }
    
    // Get the holdings for this connection
    const { data: holdings, error: holdingsError } = await supabaseClient
      .from("stock_holdings")
      .select("*")
      .eq("user_id", userId)
      .eq("connection_id", connection.id);
    
    if (holdingsError) throw holdingsError;
    
    // In a real implementation, we would refresh the holdings from the broker API
    // and update the last_price, current_value, profit_loss, etc.
    
    return new Response(
      JSON.stringify({ holdings }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching holdings:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// Fetch market data for specific symbols
async function fetchMarketData(symbols) {
  try {
    // In a real implementation, we would call a market data API
    // For now, we'll return some sample data
    
    const marketData = symbols.map(symbol => {
      // Generate a random price movement (-2% to +2%)
      const priceChange = (Math.random() * 4 - 2) / 100;
      
      // Find the base price for this symbol from our sample data
      const baseStock = getSampleIndianStockHoldings().find(s => s.symbol === symbol);
      const basePrice = baseStock?.lastPrice || 1000;
      
      // Calculate new price
      const currentPrice = basePrice * (1 + priceChange);
      
      return {
        symbol,
        currentPrice: parseFloat(currentPrice.toFixed(2)),
        change: parseFloat((priceChange * 100).toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000,
        high: parseFloat((currentPrice * 1.01).toFixed(2)),
        low: parseFloat((currentPrice * 0.99).toFixed(2)),
        timestamp: new Date().toISOString()
      };
    });
    
    return new Response(
      JSON.stringify({ marketData }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching market data:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// Helper function to generate sample Indian stock holdings
function getSampleIndianStockHoldings() {
  return [
    {
      symbol: "RELIANCE",
      exchange: "NSE",
      companyName: "Reliance Industries Ltd.",
      quantity: 10,
      averagePrice: 2500,
      lastPrice: 2650.75
    },
    {
      symbol: "TCS",
      exchange: "NSE",
      companyName: "Tata Consultancy Services Ltd.",
      quantity: 5,
      averagePrice: 3300,
      lastPrice: 3450.25
    },
    {
      symbol: "HDFCBANK",
      exchange: "NSE",
      companyName: "HDFC Bank Ltd.",
      quantity: 15,
      averagePrice: 1600,
      lastPrice: 1575.50
    },
    {
      symbol: "INFY",
      exchange: "NSE",
      companyName: "Infosys Ltd.",
      quantity: 20,
      averagePrice: 1450,
      lastPrice: 1530.80
    },
    {
      symbol: "ICICIBANK",
      exchange: "NSE",
      companyName: "ICICI Bank Ltd.",
      quantity: 25,
      averagePrice: 800,
      lastPrice: 825.40
    },
    {
      symbol: "TATAMOTORS",
      exchange: "NSE",
      companyName: "Tata Motors Ltd.",
      quantity: 30,
      averagePrice: 450,
      lastPrice: 475.25
    },
    {
      symbol: "SBIN",
      exchange: "NSE",
      companyName: "State Bank of India",
      quantity: 40,
      averagePrice: 520,
      lastPrice: 545.60
    }
  ];
}
