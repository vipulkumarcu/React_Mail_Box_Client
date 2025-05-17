import { Inbox } from "lucide-react";

function EmptyState ( { folder = "Inbox" } )
{
  return (
    <div
      className = "rounded-2xl shadow-lg ring-1 ring-indigo-100 bg-white flex flex-col items-center justify-center gap-4 py-20"
    >

      <Inbox size = { 50 } className = "text-indigo-400" />

      <p className="text-xl font-medium text-indigo-500" >
        No e‑mails in <span className="font-semibold" > { folder } </span>
      </p>

    </div>
  );
}

export default EmptyState;