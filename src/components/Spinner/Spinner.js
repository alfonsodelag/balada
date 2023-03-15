import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-blue-500 border-t-transparent shadow-md"></div>
      </div>
    </div>
  );
};

export default Spinner;
