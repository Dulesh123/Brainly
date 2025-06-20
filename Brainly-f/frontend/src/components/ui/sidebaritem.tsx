interface SidebaritemProps {
  starticon: any;
  text: string;
  onclick?:()=>void;
}

export function Sidebaritem(props: SidebaritemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-slate-300 transition-colors text-base font-medium text-gray-800">
      {props.starticon}
      <span>{props.text}</span>
    </div>
  );
}
