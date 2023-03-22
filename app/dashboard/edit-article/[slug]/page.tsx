import ArticleForm from "@/components/ArticleForm";

export default function AddNewPage({ params }: { params: { slug: string } }) {
  return (
    <div className="w-full">
      <p className="text-center">Edit Post</p>
      <ArticleForm mode={"edit"} id={params.slug} />
    </div>
  );
}
