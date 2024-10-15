"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const BlogContext = createContext<{
  posts: any[];
  addPost: any;
  addComment: any;
}>({
  posts: [],
  addPost: () => {},
  addComment: () => {},
});
export const BlogProvider = ({ children }: { children: any }) => {
  const [posts, setPosts] = useState<any>([]);

  const addPost = (post: any) => {
    setPosts([...posts, post]);
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
    <BlogContext.Provider value={{ posts, addPost, addComment }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
