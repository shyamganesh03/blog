import React from "react";

const Loader = () => {
  return (
    <div className='flex items-center justify-center space-x-2'>
      <div className='w-4 h-4 border-4 border-t-transparent border-primary rounded-full animate-spin'></div>
    </div>
  );
};

export default Loader;
