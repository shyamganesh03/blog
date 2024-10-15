import BlogDetails from "@/components/blogs/BlogDetails";
import { useBlogContext } from "@/store/blogs";
import React from "react";

const BlogDetailsPage = async ({ params }: { params: any }) => {
  return <BlogDetails blogId={params?.id || -1} />;
};

export default BlogDetailsPage;
