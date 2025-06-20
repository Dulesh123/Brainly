import { DeleteIcon } from "../icons/deleteicon";
import { PlusIcon } from "../icons/plusicon";
import { ShareIcon } from "../icons/share";

interface Cradprops {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
export function Card(props: Cradprops) {
  let link = props.link;
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-200 max-w-72 text-lg space-y-4">
      {/* Header Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <PlusIcon size="lg" />
          <span>{props.title}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <a href={link} target="_blanck">
            <ShareIcon size="lg" />
          </a>
          <DeleteIcon size="lg" />
        </div>
      </div>

      <div className="aspect-video w-full rounded-md overflow-hidden pt-2">
        {props.type === "youtube" && (
          <iframe
            className="w-full h-full"
            src={props.link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div>
  {props.type === "twitter" && (
    <blockquote className="twitter-tweet">
      <a
        href={props.link.replace("x.com", "twitter.com")}
      ></a>
    </blockquote>
  )}
</div>

      
    </div>
  );
}
