import { BrainIcon } from "../icons/brainicon";
import { ShareIcon } from "../icons/share";
import Button from "./button";

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-72 bg-white border-r shadow-lg z-40 flex flex-col">
      {/* Header Branding */}
      <div className="flex items-center gap-2 text-2xl font-bold px-6 py-5 border-b border-slate-200 bg-slate-50">
        <BrainIcon />
        <span className="text-gray-800">Second Brain</span>
      </div>

      {/* Navigation Buttons */}
      <div className="flex-1 px-4 py-6 space-y-3">
        <SidebarButton text="Youtube" />
        <SidebarButton text="Twitter" />
        
      </div>

      {/* Share Button */}
     

      {/* Footer */}
      <div className="px-6 py-4 text-xs text-gray-400 border-t border-slate-200">
        © 2025 Second Brain
      </div>
    </div>
  );
}

function SidebarButton({ text }: { text: string }) {
  return (
    <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-gray-800 font-medium transition duration-200">
      {text}
    </button>
  );
}
