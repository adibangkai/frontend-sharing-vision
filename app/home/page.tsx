import { Article } from "@/lib/utils";
import Link from "next/link";

const getPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/status/Publish/4/0`,
    {
      cache: "no-cache",
    }
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getTotal = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/status/Publish`, {
    cache: "no-cache",
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function HomePage() {
  const { data }: Article = await getPosts();
  const total = await getTotal();

  if (data.length === 0) {
    return (
      <div className="text-center pt-10">
        there's no post yet!{" "}
        <Link
          className="text-zinc-800 hover:opacity-50"
          href={"/dashboard/add-new"}
        >
          click here
        </Link>
      </div>
    );
  }
  const totalPage =
    total.data.length > 4 ? Math.ceil(total.data.length / 4) : 1;

  return (
    <div className="grid gap-3 w-full md:w-3/4  px-4 pl-10">
      {data.map((post) => (
        <div className=" grid bg-zinc-50 p-4" key={post.id}>
          <Link href={`/preview/${post.id}`}>
            <div className="font-bold text-xl cursor-pointer">{post.title}</div>
          </Link>
          <div className=" font-thin text-xs text-zinc-400">
            category - {post.category}
          </div>
          <p className=" font-extralight text-justify text-sm line-clamp-3">
            {post.content}
          </p>
        </div>
      ))}

      <div className="paginate flex gap-4 justify-center w-full ">
        {[...Array(Math.ceil(totalPage))].map((e, i) => (
          <Link href={`/home/${i + 1}`} className="hover:opacity-60">
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
