import { apiCall } from "./apicall";

export const fetchBlogData = async () => {
  const data = await apiCall({ pathName: "/posts", method: "GET" });
  return data;
};
