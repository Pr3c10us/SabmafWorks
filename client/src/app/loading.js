import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md">
      <span className="loading loading-bars loading-lg text-primary/80"></span>
    </div>
  );
};

export default Loading;
