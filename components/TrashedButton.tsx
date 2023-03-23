"use client";
import { Trash } from "react-feather";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function TrashedButton({ id, data }: { id: string; data: any }) {
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...data, status: "Trash" }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      router.refresh();
      router.replace("/dashboard/");
    } catch (e) {
      window.alert("error");
    }
  };

  return (
    <>
      {/* The button to open modal */}
      <label htmlFor={`del-modal-${id}`} className="cursor-pointer">
        <Trash size={14} className="text-rose-400  hover:opacity-70" />
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id={`del-modal-${id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={`del-modal-${id}`}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <button className="btn" onClick={onSubmit}>
            hapus
          </button>
        </div>
      </div>
    </>
  );
}
