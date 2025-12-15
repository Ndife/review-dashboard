import Link from "next/link";
import { ArrowRight, LayoutDashboard, Home } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-neutral-900 text-white">
      <div className="space-y-4 text-center">
        <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Flex Living Reviews
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            A comprehensive dashboard for managing and showcasing guest feedback.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link 
            href="/dashboard"
            className="group relative overflow-hidden rounded-3xl bg-neutral-800 p-8 hover:bg-neutral-800/80 transition-all border border-neutral-700 hover:border-neutral-600"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                    <LayoutDashboard className="w-8 h-8" />
                </div>
                <div>
                     <h2 className="text-2xl font-bold">Manager Dashboard</h2>
                     <p className="text-neutral-400 mt-2">Validate and monitor incoming reviews.</p>
                </div>
                <div className="flex items-center gap-2 text-indigo-400 font-medium pt-4 group-hover:gap-3 transition-all">
                    Access Dashboard <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
        
        <Link 
            href="/property/1"
            className="group relative overflow-hidden rounded-3xl bg-neutral-800 p-8 hover:bg-neutral-800/80 transition-all border border-neutral-700 hover:border-neutral-600"
        >
             <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex flex-col items-start space-y-4">
                <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <Home className="w-8 h-8" />
                </div>
                <div>
                     <h2 className="text-2xl font-bold">Public Property Page</h2>
                     <p className="text-neutral-400 mt-2">View approved guest feedback live.</p>
                </div>
                 <div className="flex items-center gap-2 text-emerald-400 font-medium pt-4 group-hover:gap-3 transition-all">
                    View Live Page <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </Link>
      </div>
    </div>
  );
}
