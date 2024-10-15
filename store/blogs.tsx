import React, { createContext, useState, useContext, useEffect } from "react";

const BlogContext = createContext<{
  posts: any[];
  currentPost: any;
  viewPost: any;
  addComment: any;
}>({
  posts: [],
  currentPost: null,
  viewPost: () => {},
  addComment: () => {},
});
export const BlogProvider = ({
  children,
  blogs,
}: {
  children: any;
  blogs: any[];
}) => {
  const [posts, setPosts] = useState(
    JSON.parse(sessionStorage.getItem("posts") || "[]") || []
  );
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    if (!blogs || blogs.length <= 0) return;

    (() => {
      sessionStorage.setItem("blogs", JSON.stringify(blogs));
      setPosts(blogs);
    })();
  }, [blogs]);

  const viewPost = (postId: number) => {
    const selectedPost = posts.find((post: any) => post.id === postId) || null;
    setCurrentPost(selectedPost);
  };

  const addComment = (postId: number, comment: string) => {
    const updatedPosts = posts.map((post: any) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <BlogContext.Provider value={{ posts, currentPost, viewPost, addComment }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
