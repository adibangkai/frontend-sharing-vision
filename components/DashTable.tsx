import { Article } from "@/lib/utils";
import Link from "next/link";
import { Edit } from "react-feather";
import TrashedButton from "./TrashedButton";

export default function DashTable({ data }: Article) {
  if (data.length === 0)
    return <div className="text-center">there's no post on this status</div>;
  return (
    <div className="overflow-x-auto">
      <table className=" table-fixed table-compact  w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="bg-zinc-100 w-1/12"></th>
            <th className="bg-zinc-100  w-2/12">Title</th>
            <th className="bg-zinc-100  w-5/12 truncate">Content</th>
            <th className="bg-zinc-100 w-2/12"> Category</th>
            <th className="bg-zinc-100 w-1/12">Status</th>
            <th className="bg-zinc-100 w-1/12">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((datum, i) => (
            <tr key={i} className="border-b-1 border-zinc-100">
              <th className="w-1/12">{i + 1}</th>
              <td className="w-2/12"> {datum.title}</td>
              <td className="w-5/12 truncate ">{datum.content}</td>
              <td className="w-2/12">{datum.category}</td>
              <td className="w-1/12">{datum.status}</td>
              <td className="w-1/12 flex p-4 gap-2">
                <Link href={`/dashboard/edit-article/${datum.id}`}>
                  <Edit size={14} />
                </Link>
                {datum.status !== "Trash" && (
                  <TrashedButton id={datum.id} data={datum} />
                )}
              </td>
            </tr>
          ))}
          {/* row 2 */}
        </tbody>
      </table>
    </div>
  );
}
