import { fetchBlogData } from "@/api/blogs";
import BlogListing from "@/components/blogs/BlogListing";

const Blog = async () => {
  const data = await fetchBlogData();

  return <BlogListing blogData={data} />;
};

export default Blog;
