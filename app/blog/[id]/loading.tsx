import Loader from "@/components/ui/loader";
import React from "react";

const Loading = () => {
  return (
    <div className='flex flex-1 h-screen w-full overflow-hidden'>
      <Loader />
    </div>
  );
};

export default Loading;
