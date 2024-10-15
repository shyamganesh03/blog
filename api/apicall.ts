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
