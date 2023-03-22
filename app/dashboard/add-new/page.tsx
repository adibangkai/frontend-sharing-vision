import ArticleForm from "@/components/ArticleForm";

export default function AddNewPage() {
  return (
    <div className="w-full">
      <p className="text-center">Add Post</p>

      <ArticleForm mode={"add"} id={null} />
    </div>
  );
}
