"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const BlogContext = createContext<{
  addPost: (post: any) => void;
  addComment: any;
  getPosts: any;
  posts: any;
}>({
  addPost: () => {},
  addComment: () => {},
  getPosts: () => {},
  posts: [],
});

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const storedPosts = sessionStorage.getItem("posts");
      return storedPosts ? JSON.parse(storedPosts) : [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = (post: any) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const addComment = (postId: string, comment: any) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id == postId
          ? {
              ...post,
              comments: post.comments ? [...post.comments, comment] : [comment],
            }
          : post
      )
    );
  };

  const getPosts = (postId: string) => {
    return posts.find((post) => post.id == postId);
  };

  return (
    <BlogContext.Provider value={{ addPost, addComment, getPosts, posts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
