"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import ArticleFormSkeleton from "./ArticleFormSkeleton";

const initial = { title: "", content: "", category: "", status: "" };
export default function ArticleForm({
  mode,
  id,
}: {
  mode: "add" | "edit";
  id: string | null;
}) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (mode === "edit") {
      setLoading(true);

      const fetchData = async () => {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/article/${id}`
        );
        const json = await data.json();
        setFormState(json);
        setLoading(false);
      };
      fetchData();
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/`, {
          method: "POST",
          body: JSON.stringify(formState),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        router.refresh();
        router.replace("/dashboard/");
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`, {
          method: "PUT",
          body: JSON.stringify(formState),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        router.refresh();
        router.replace("/dashboard/");
      }
    } catch (e) {
      window.alert("something wrong");
    }
  };
  if (isLoading) return <ArticleFormSkeleton />;

  return (
    <div className=" mt-4">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 justify-items-center "
      >
        <input
          type="text"
          placeholder="Title"
          minLength={20}
          maxLength={100}
          value={formState.title as string}
          className="input input-bordered w-2/4 "
          onChange={(e) =>
            setFormState((s) => ({ ...s, title: e.target.value }))
          }
          required
        />
        <textarea
          className="textarea textarea-bordered border-1 border-zinc-200 w-2/4"
          placeholder="Content"
          value={formState.content as string}
          onChange={(e) =>
            setFormState((s) => ({ ...s, content: e.target.value }))
          }
          minLength={200}
          rows={8}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-2/4 "
          value={formState.category as string}
          onChange={(e) =>
            setFormState((s) => ({ ...s, category: e.target.value }))
          }
          minLength={3}
          required
        />
        <div className="flex gap-2">
          <button
            className="btn"
            type="submit"
            onClick={(e) => {
              setFormState((s) => ({ ...s, status: "Publish" }));
              // handleSubmit(e);
            }}
          >
            Publish
          </button>
          <button
            className="btn"
            type="submit"
            onClick={(e) => {
              setFormState((s) => ({ ...s, status: "Draft" }));
              // handleSubmit(e);
            }}
          >
            Draft
          </button>
        </div>
      </form>
    </div>
  );
}
