import TableTab from "@/components/TableTab";

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
const getArticle = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/`, {
    cache: "no-cache",
    next: {
      revalidate: 36000,
    },
  });

  return res.json();
};

export default async function Home() {
  const { data }: Article = await getArticle();
  const published: ArticleProps[] = data.filter(
    (article) => article.status === "Publish"
  );
  const drafted: ArticleProps[] = data.filter(
    (article) => article.status === "Draft"
  );
  const trashed: ArticleProps[] = data.filter(
    (article) => article.status === "Trash"
  );

  return (
    <>
      <TableTab published={published} drafted={drafted} trashed={trashed} />
    </>
  );
}
