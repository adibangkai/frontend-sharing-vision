export const getPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/published/4/0`, {
    cache: "no-cache",
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
