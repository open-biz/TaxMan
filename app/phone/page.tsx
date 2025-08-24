"use client";

import { fetchHumeToken } from "./actions";
import Chat from "@/components/Chat";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhonePage() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Get Hume access token on component mount
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const result = await fetchHumeToken();
        if (result.error) {
          console.error("Failed to get Hume access token:", result.error);
        } else if (result.token) {
          setAccessToken(result.token);
        }
      } catch (error) {
        console.error("Failed to get Hume access token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-2xl">Connecting to Tax Man AI...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white relative">
      {/* Navigation header */}
      <div className="fixed top-4 right-4 z-20">
        <Link href="/">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-gray-800 hover:bg-gray-700 text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </Link>
      </div>
      
      {/* Full height Chat component */}
      <div className="h-screen">
        {accessToken && <Chat accessToken={accessToken} />}
      </div>
    </div>
  );
}
