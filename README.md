### Blog Website

## Implementation Steps

I am building a blog site using the [shadcn/ui](https://ui.shadcn.com/) library.

First, I set up the project with the necessary components from shadcn and configured both light and dark themes.

Next, I created a folder structure for the project and implemented context management with session storage.

Under the `api` folder, I wrote a file named `apiCall.ts` that contains a common function for making API calls:

```typescript
export const apiCall = async ({
  pathName,
  method,
}: {
  pathName: string;
  method: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${pathName}`,
      {
        method: method,
      }
    );
    const finalResponse = await response.json();
    return finalResponse;
  } catch (error) {
    console.error("API call error:", error);
  }
};
```

Then, I created a file for fetching blog data, where I utilized the above function:

```typescript
import { apiCall } from "./apicall";

export const fetchBlogData = async () => {
  const data = await apiCall({ pathName: "/posts", method: "GET" });
  return data;
};
```

Following that, I developed the blog listing screen and made API calls on the server side, passing the data to the blog listing component located in the `components/blogs` directory.

Next, I created a blog details screen and integrated it with the blog listing screen. When a user clicks on a blog, I store the selected blog details in both the global store and sessionStorage under the key "Posts."

When navigating back to the listing screen, I clear the sessionStorage, as the stored data is no longer needed. This approach helps maintain optimal performance by preventing unnecessary data accumulation in the browser's storage.

Finally, I have implemented a mode toggle feature on my blog site, allowing users to switch between light and dark themes. The default theme is set based on the system preferences, leveraging Next.js for seamless integration.

## Code Review

I received the following code via email:

```typescript
function fetchData() {
  const posts = fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
```

In this implementation, we can enhance readability by using the `async` and `await` keywords. Additionally, the variable `posts` is declared but not utilized anywhere, and the function does not return any value. Therefore, we should modify the function to return the posts so that the data can be accessed in the UI.

## Improvements

I created a separate function for making API calls in the `apiCall.ts` file to enhance reusability. From the `blogs.ts` file, I then called this function to retrieve blog details. I encapsulated the `try` block in the `apiCall.ts` file, as it serves as the main function for handling API calls, and I configured the API endpoint using an environment variable from the `.env` file.

Here's an explanation of your React code in Markdown format:

````markdown
# Blog Context Code Explanation

This code defines a context for managing blog posts and comments in a React application. It uses the Context API and hooks to provide functionality related to blog posts throughout the application.

## Code Breakdown

### 1. **Imports**

```javascript
import React, { createContext, useState, useContext, useEffect } from "react";
```
````

- `React`: The core library for building user interfaces.
- `createContext`: A function to create a context for the application.
- `useState`: A hook to manage state in functional components.
- `useContext`: A hook to consume the context values in components.
- `useEffect`: A hook to perform side effects in components, such as data fetching or subscriptions.

### 2. **Creating the Blog Context**

```javascript
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
```

- `BlogContext`: The context object created using `createContext`. It defines the structure of the context with four properties:
  - `addPost`: A function to add a new post.
  - `addComment`: A function to add a comment to a post.
  - `getPosts`: A function to retrieve a post by its ID.
  - `posts`: An array that holds the current blog posts.

### 3. **BlogProvider Component**

```javascript
export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
```

- `BlogProvider`: A functional component that wraps its children with the `BlogContext.Provider`, providing the blog functionalities to all components within.

### 4. **State Initialization**

```javascript
const [posts, setPosts] = useState<any[]>(() => {
  if (typeof window !== "undefined") {
    const storedPosts = sessionStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  }
});
```

- This initializes the `posts` state. It checks if the code is running in the browser (to avoid errors during server-side rendering).
- It retrieves any previously stored posts from `sessionStorage` and parses them. If there are no stored posts, it initializes `posts` as an empty array.

### 5. **UseEffect Hook for Synchronization**

```javascript
useEffect(() => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("posts", JSON.stringify(posts));
  }
}, [posts]);
```

- This `useEffect` hook synchronizes the `posts` state with `sessionStorage` whenever `posts` changes.
- It converts the `posts` array into a string format and stores it in `sessionStorage`.

### 6. **Function Definitions**

#### a. **addPost**

```javascript
const addPost = (post: any) => {
  setPosts((prevPosts) => [...prevPosts, post]);
};
```

- `addPost`: A function that takes a new post as an argument and updates the `posts` state by adding the new post to the existing array.

#### b. **addComment**

```javascript
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
```

- `addComment`: A function that takes a `postId` and a `comment` as arguments. It updates the specific post by appending the new comment to its `comments` array.

#### c. **getPosts**

```javascript
const getPosts = (postId: string) => {
  return posts.find((post) => post.id == postId);
};
```

- `getPosts`: A function that retrieves a post by its `postId`. It returns the post object if found.

### 7. **Provider Return**

```javascript
return (
  <BlogContext.Provider value={{ addPost, addComment, getPosts, posts }}>
    {children}
  </BlogContext.Provider>
);
```

- The `BlogProvider` returns the `BlogContext.Provider`, passing the state and functions (`addPost`, `addComment`, `getPosts`, and `posts`) as values to the context. This makes them accessible to any component that consumes this context.

### 8. **Custom Hook**

```javascript
export const useBlogContext = () => useContext(BlogContext);
```

- `useBlogContext`: A custom hook that simplifies the process of consuming the `BlogContext` in any component. It uses the `useContext` hook to access the context values.

## Conclusion

This code provides a centralized way to manage blog posts and comments in a React application, allowing components to interact with the blog state through a context. By leveraging `sessionStorage`, it ensures that the state persists across page refreshes while still allowing for easy updates and retrieval of data.
