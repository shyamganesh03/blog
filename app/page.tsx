import { fetchBlogData } from "@/api/blogs";
import BlogListing from "@/components/blogs/BlogListing";

export default async function Blog() {
  const data = await fetchBlogData();

  return <BlogListing blogData={data} />;
}
