const getPreview = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${id}`, {
    cache: "no-cache",
  });

  return res.json();
};

export default async function PreviewPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getPreview(params.slug);
  return (
    <div className="grid gap-3 w-full md:w-3/4  px-4 pl-10">
      <div className=" grid bg-zinc-50 p-4">
        <div className="font-bold text-xl">{data.title}</div>
        <div className=" font-thin text-xs ml-4 text-zinc-400">
          category - {data.category}
        </div>
        <p className=" font-extralight text-justify text-sm">{data.content}</p>
      </div>
    </div>
  );
}
