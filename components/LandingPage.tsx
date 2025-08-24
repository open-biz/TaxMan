"use client";

import { Phone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

export default function LandingPage({
  accessToken
}: {
  accessToken: string
}) {
  // Use Next.js router for navigation
  const router = useRouter();
  
  // Define the phone number for use throughout the page
  const phoneNumberDisplay = "+1 978 TAX-MANG";
  
  // Create refs for each conversation message
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref5, inView5] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref6, inView6] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 text-white relative">
      {/* Navigation header */}
      <div className="py-4 px-6 flex justify-end items-center">
        <Link href="/dashboard">
          <Button variant="ghost" className="rounded-full bg-purple-600/20 hover:bg-purple-500/30 text-white flex items-center gap-2 px-5 py-2">
            <BarChart3 className="h-5 w-5" />
            <span>Dashboard</span>
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-10 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
          Tax Man AI<br/> Business Valuations and Tax Advice
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
          Get a professional business valuation in minutes, not weeks. Our AI tax expert will guide you through the process.
        </p>
        <div className="flex justify-center">
          <Button 
            className="rounded-full text-lg md:text-xl py-6 px-10 bg-purple-600 hover:bg-purple-500 flex items-center gap-3"
            onClick={() => router.push('/phone')}
          >
            <Phone className="w-6 h-6" />
            <span>{phoneNumberDisplay}</span>
          </Button>
        </div>
      </section>

      {/* Scrolling Demo Conversation */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">See how Tax Man helps your business</h2>
        
        <div className="space-y-24 pb-16">  {/* Increased spacing between messages */}
          {/* Message 1 */}
          <div ref={ref1} className={`transform transition-all duration-700 ${inView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-end mb-4">
              <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] text-lg shadow-lg">
                Hi, I run a furniture business on Amazon and I have some questions about my shipping options and taxes.
              </div>
            </div>
          </div>
          
          {/* Message 2 */}
          <div ref={ref2} className={`transform transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-start mb-4">
              <div className="bg-gray-800 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] text-lg shadow-lg">
                Hello! I'm Tax Man AI. I'd be happy to help with your Amazon furniture business. Could you tell me a bit more about your current shipping setup?
              </div>
            </div>
          </div>
          
          {/* Message 3 */}
          <div ref={ref3} className={`transform transition-all duration-700 ${inView3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-end mb-4">
              <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] text-lg shadow-lg">
                I'm currently using USPS for most shipments, but I'm considering switching to FedEx for my larger furniture items. I'm wondering how this might affect my taxes.
              </div>
            </div>
          </div>
          
          {/* Message 4 */}
          <div ref={ref4} className={`transform transition-all duration-700 ${inView4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-start mb-4">
              <div className="bg-gray-800 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] text-lg shadow-lg">
                That's a great question. Switching carriers can have tax implications. FedEx may have different tax treatments depending on the states you're shipping to. Are you shipping nationwide or to specific regions?
              </div>
            </div>
          </div>
          
          {/* Message 5 */}
          <div ref={ref5} className={`transform transition-all duration-700 ${inView5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-end mb-4">
              <div className="bg-purple-600 text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] text-lg shadow-lg">
                We ship nationwide, but most of our customers are in California, Texas, and New York.
              </div>
            </div>
          </div>
          
          {/* Message 6 */}
          <div ref={ref6} className={`transform transition-all duration-700 ${inView6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] text-lg shadow-lg">
                For those states, FedEx may be more tax-efficient for larger items. Since CA, TX, and NY have different tax rules for shipping furniture, you could potentially save on taxes by using FedEx's commercial rates and their tax calculation systems. Additionally, you might be eligible for certain deductions on shipping costs that aren't available with USPS. Would you like me to analyze your specific shipping costs to provide a more detailed tax comparison?
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-slate-900 to-purple-900">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Ready to optimize your business taxes?</h2>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">Our AI tax expert will answer your questions and help you make the best decisions for your business.</p>
        <div className="flex justify-center">
          <Button 
            className="rounded-full text-lg py-6 px-8 bg-purple-600 hover:bg-purple-500 flex items-center gap-3"
            onClick={() => router.push('/phone')}
          >
            <Phone className="w-6 h-6" />
            <span>Call Now</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
