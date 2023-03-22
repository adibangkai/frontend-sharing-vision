import Link from "next/link";

const getPosts = async (page: number) => {
  const offset: number = 4 * (page - 1);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/published/4/${offset}`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};
interface ArticleProps {
  title: string;
  content: string;
  category: string;
  id: string;
  status: string;
}
interface Article {
  data: ArticleProps[];
}
export default async function PaginatePage({
  params,
}: {
  params: { slug: number };
}) {
  console.log(params.slug);
  const { data }: Article = await getPosts(params.slug);

  if (data.length === 0) {
    return <div className="text-center pt-10">there's no post yet</div>;
  }
  const totalPage = data.length > 4 ? data.length / 4 : 1;

  return (
    <div className="grid gap-3 w-full md:w-3/4  px-4 pl-10">
      {data.map((post) => (
        <div className=" grid bg-zinc-50 p-4" key={post.id}>
          <Link href={`/preview/${post.id}`}>
            <div className="font-bold text-xl cursor-pointer">{post.title}</div>
          </Link>{" "}
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
