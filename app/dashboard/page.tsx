"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Upload, ShoppingBag, ShoppingCart, TrendingUp, Package, DollarSign, Calendar, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/ui/DashboardCard";

// Mock data structure - initially empty
type BusinessDataType = {
  businessName: string | null;
  valuation: string | null;
  revenueMonthly: string | null;
  revenueYTD: string | null;
  inventory: number | null;
  netProfit: string | null;
  amazonAge: string | null;
}

type ValuationDataType = {
  absolute_low_multiple: number;
  typical_low_multiple: number;
  suggested_listing_multiple: number;
  typical_high_multiple: number;
  absolute_high_multiple: number;
  absolute_low_valuation: number;
  typical_low_valuation: number;
  suggested_listing_price: number;
  typical_high_valuation: number;
  absolute_high_valuation: number;
  is_profit_multiple: boolean;
}

// Mock populated data to be used after connection
const mockPopulatedData: BusinessDataType = {
  businessName: "TechSolve Inc.",
  valuation: null,
  revenueMonthly: "$210,000",
  revenueYTD: "$1.8M",
  inventory: 1245,
  netProfit: "$85,000",
  amazonAge: "3 years, 8 months"
};

// Initial empty state
const emptyBusinessData: BusinessDataType = {
  businessName: null,
  valuation: null,
  revenueMonthly: null,
  revenueYTD: null,
  inventory: null,
  netProfit: null,
  amazonAge: null
};

export default function DashboardPage() {
  // States for connection status
  const [amazonConnected, setAmazonConnected] = useState(false);
  const [amazonLoading, setAmazonLoading] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [tiktokLoading, setTiktokLoading] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessDataType>(emptyBusinessData);
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [valuationData, setValuationData] = useState<ValuationDataType | null>(null);
  const [valuationLoading, setValuationLoading] = useState(false);
  
  // Check if any financial source is connected
  const isAnyFinancialConnected = amazonConnected || tiktokConnected;

  // Handle document upload
  const handleDocumentUpload = () => {
    const newDoc = `Business Registration - ${new Date().toLocaleDateString()}`;
    setUploadedDocuments([...uploadedDocuments, newDoc]);
  };

  // Handle Amazon connection
  const handleAmazonConnect = () => {
    if (amazonConnected) {
      // Disconnect logic
      setAmazonConnected(false);
      // Reset data if both connections are removed
      if (!tiktokConnected) {
        setBusinessData(emptyBusinessData);
      }
    } else {
      // Connect logic with loading spinner
      setAmazonLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setAmazonConnected(true);
        setAmazonLoading(false);
        setBusinessData(mockPopulatedData);
      }, 2000);
    }
  };

  // Handle TikTok connection
  const handleTikTokConnect = () => {
    if (tiktokConnected) {
      // Disconnect logic
      setTiktokConnected(false);
      // Reset data if both connections are removed
      if (!amazonConnected) {
        setBusinessData(emptyBusinessData);
      }
    } else {
      // Connect logic with loading spinner
      setTiktokLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setTiktokConnected(true);
        setTiktokLoading(false);
        setBusinessData(mockPopulatedData);
      }, 2000);
    }
  };

  // Handle valuation update
  const handleUpdateValuation = async () => {
    if (!businessData.netProfit) {
      console.error('No net profit data available');
      return;
    }

    setValuationLoading(true);
    
    try {
      const netProfitNumber = parseFloat(businessData.netProfit.replace(/[^\d.-]/g, ''));
      
      console.log('Sending net profit to API:', netProfitNumber);
      
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          averageMonthlyNetProfit: netProfitNumber,
          monetization: amazonConnected ? 'Amazon FBA' : 'E-commerce',
          businessCreatedAt: '2020-01-01'
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.data) {
        setValuationData(result.data);
        console.log('Valuation data received:', result.data);
      } else {
        console.error('Failed to fetch valuation:', result.error);
      }
    } catch (error) {
      console.error('Error fetching valuation:', error);
    } finally {
      setValuationLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white pt-16">
      {/* Page Title */}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
          Business Dashboard
        </h1>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Valuation Section - Only shown when connected */}
        {isAnyFinancialConnected && (
          <section className="mb-12">
            <DashboardCard className="bg-gradient-to-r from-purple-900/70 to-indigo-900/70 border-2 border-purple-500/30 shadow-xl rounded-xl overflow-hidden">
              <div className="p-6 md:p-8">
                <h2 className="text-xl text-gray-300 mb-2">Current Business Valuation</h2>
                <div className="flex items-end gap-4">
                  <div className="text-5xl md:text-6xl font-bold text-white">
                    {valuationData ? `$${valuationData.suggested_listing_price.toLocaleString()}` : 'Click to get valuation'}
                  </div>
                  <Button 
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500"
                    onClick={handleUpdateValuation}
                    disabled={valuationLoading || !businessData.netProfit}
                  >
                    {valuationLoading ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <RefreshCw size={16} />
                    )}
                    <span>{valuationLoading ? 'Updating...' : 'Update Valuation'}</span>
                  </Button>
                </div>
                
                {/* Valuation Ranges */}
                {valuationData && (
                  <div className="mt-6 pt-6 border-t border-purple-500/30">
                    <h3 className="text-lg font-semibold mb-4 text-gray-300">Valuation Ranges</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-purple-800/30 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-purple-300 mb-2">Conservative (Low)</h4>
                        <p className="text-xl font-bold text-white">${valuationData.typical_low_valuation.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">{valuationData.typical_low_multiple}x multiple</p>
                      </div>
                      <div className="bg-green-800/30 p-4 rounded-lg border border-green-500/30">
                        <h4 className="text-sm font-medium text-green-300 mb-2">Suggested Listing</h4>
                        <p className="text-xl font-bold text-white">${valuationData.suggested_listing_price.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">{valuationData.suggested_listing_multiple}x multiple</p>
                      </div>
                      <div className="bg-blue-800/30 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-blue-300 mb-2">Optimistic (High)</h4>
                        <p className="text-xl font-bold text-white">${valuationData.typical_high_valuation.toLocaleString()}</p>
                        <p className="text-xs text-gray-400 mt-1">{valuationData.typical_high_multiple}x multiple</p>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-gray-400 mt-2">
                  Based on your connected store data and industry multipliers
                </p>
              </div>
            </DashboardCard>
          </section>
        )}

        {/* Connection Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Connect Your Stores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Amazon Connection */}
            <DashboardCard className={`border ${amazonConnected ? 'border-green-500/50' : 'border-gray-700'} bg-black/30 rounded-xl overflow-hidden`}>
              <div className="p-6 flex flex-col items-center">
                <div className="h-16 w-16 mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-300 rounded-full opacity-20"></div>
                  <div className="flex items-center justify-center h-full">
                    <ShoppingCart className="h-10 w-10 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Amazon Seller Central</h3>
                <p className="text-gray-400 text-center mb-4">
                  {amazonConnected 
                    ? "Connected and syncing data" 
                    : "Connect your Amazon seller account to import sales data"}
                </p>
                <Button 
                  className={`w-full ${amazonConnected ? 'bg-green-700 hover:bg-green-600' : 'bg-orange-600 hover:bg-orange-500'}`}
                  onClick={handleAmazonConnect}
                  disabled={amazonLoading}
                >
                  {amazonLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : amazonConnected ? 'Connected' : 'Connect to Amazon'}
                </Button>
              </div>
            </DashboardCard>
            
            {/* TikTok Shop Connection */}
            <DashboardCard className={`border ${tiktokConnected ? 'border-green-500/50' : 'border-gray-700'} bg-black/30 rounded-xl overflow-hidden`}>
              <div className="p-6 flex flex-col items-center">
                <div className="h-16 w-16 mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-black rounded-full opacity-20"></div>
                  <div className="flex items-center justify-center h-full">
                    <ShoppingBag className="h-10 w-10 text-pink-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">TikTok Shop</h3>
                <p className="text-gray-400 text-center mb-4">
                  {tiktokConnected 
                    ? "Connected and syncing data" 
                    : "Connect your TikTok shop to import sales data"}
                </p>
                <Button 
                  className={`w-full ${tiktokConnected ? 'bg-green-700 hover:bg-green-600' : 'bg-pink-600 hover:bg-pink-500'}`}
                  onClick={handleTikTokConnect}
                  disabled={tiktokLoading}
                >
                  {tiktokLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : tiktokConnected ? 'Connected' : 'Connect to TikTok Shop'}
                </Button>
              </div>
            </DashboardCard>
          </div>
        </section>

        {/* Business Metrics */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Business Metrics</h2>
          
          {!isAnyFinancialConnected ? (
            <DashboardCard className="bg-gradient-to-br from-slate-900/40 to-slate-800/20 border-slate-700/30 rounded-xl overflow-hidden">
              <div className="p-8 flex flex-col items-center text-center">
                <div className="text-slate-400 mb-4">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-3">No Financial Data Connected</h3>
                  <p className="mb-6">Connect your Amazon or TikTok Shop account to see your business metrics and get a valuation.</p>
                </div>
                <div className="flex gap-4 flex-wrap justify-center">
                  <Button 
                    className="bg-orange-600 hover:bg-orange-500" 
                    onClick={handleAmazonConnect}
                  >
                    Connect Amazon
                  </Button>
                  <Button 
                    className="bg-pink-600 hover:bg-pink-500" 
                    onClick={handleTikTokConnect}
                  >
                    Connect TikTok Shop
                  </Button>
                </div>
              </div>
            </DashboardCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Revenue Card */}
              <DashboardCard className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-700/30 rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-blue-300 text-sm font-medium">Monthly Revenue</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{businessData.revenueMonthly || '-'}</h3>
                      <p className="text-blue-400 text-xs mt-1">YTD: {businessData.revenueYTD || '-'}</p>
                    </div>
                    <div className="bg-blue-600/20 p-2 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                    </div>
                  </div>
                </div>
              </DashboardCard>

              {/* Inventory Card */}
              <DashboardCard className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 border-amber-700/30 rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-amber-300 text-sm font-medium">Inventory Count</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{businessData.inventory || '-'}</h3>
                      <p className="text-amber-400 text-xs mt-1">SKUs across all platforms</p>
                    </div>
                    <div className="bg-amber-600/20 p-2 rounded-lg">
                      <Package className="h-5 w-5 text-amber-400" />
                    </div>
                  </div>
                </div>
              </DashboardCard>

              {/* Net Profit Card */}
              <DashboardCard className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-emerald-700/30 rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-emerald-300 text-sm font-medium">Net Profit (Monthly)</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{businessData.netProfit || '-'}</h3>
                      <p className="text-emerald-400 text-xs mt-1">40.5% margin</p>
                    </div>
                    <div className="bg-emerald-600/20 p-2 rounded-lg">
                      <DollarSign className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </DashboardCard>

              {/* Amazon Age Card */}
              <DashboardCard className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border-orange-700/30 rounded-xl overflow-hidden">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-orange-300 text-sm font-medium">Amazon Account Age</p>
                      <h3 className="text-2xl font-bold text-white mt-1">{businessData.amazonAge || '-'}</h3>
                      <p className="text-orange-400 text-xs mt-1">{businessData.amazonAge ? 'Good standing' : '-'}</p>
                    </div>
                    <div className="bg-orange-600/20 p-2 rounded-lg">
                      <Calendar className="h-5 w-5 text-orange-400" />
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          )}
        </section>

        {/* Document Upload Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Business Documentation</h2>
          <DashboardCard className="border border-gray-700 bg-black/30 rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Upload Business Documents</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Upload your business incorporation and registration documents
                  </p>
                </div>
                <Button onClick={handleDocumentUpload} className="bg-purple-700 hover:bg-purple-600 flex items-center gap-2">
                  <Upload size={16} />
                  <span>Upload Documents</span>
                </Button>
              </div>

              {/* Uploaded documents list */}
              <div className="border-t border-gray-800 mt-4 pt-4">
                <h4 className="text-sm text-gray-400 mb-2">Uploaded Documents</h4>
                {uploadedDocuments.length > 0 ? (
                  <ul className="space-y-2">
                    {uploadedDocuments.map((doc, index) => (
                      <li key={index} className="bg-gray-800/50 px-4 py-3 rounded-lg flex justify-between items-center">
                        <span className="text-sm">{doc}</span>
                        <span className="text-xs text-green-400">Verified</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">No documents uploaded yet</p>
                )}
              </div>
            </div>
          </DashboardCard>
        </section>
      </main>
    </div>
  );
}
