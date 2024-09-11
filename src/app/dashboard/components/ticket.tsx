import { File, Trash } from "lucide-react";

export function Ticket() {
  return (
    <>
      <tr className="border-b border-b-neutral-700 h-16 last:border-b-0 hover:bg-neutral-800 transition-all duration-300">
        <td className="text-gray-400 text-left px-2">teste</td>
        <td className="text-gray-400 text-left px-2">teste</td>
        <td className="text-white text-left px-2">
          <span className="bg-emerald-500 items-center justify-center px-2 py-1 rounded-md text-xs">
            ABERTO
          </span>
        </td>
        <td className="text-gray-400 text-left px-2">
          <button className="mr-2">
            <Trash size={20} color="#e11d48" />
          </button>
          <button>
            <File size={20} color="#6366f1" />
          </button>
        </td>
      </tr>
    </>
  );
}
