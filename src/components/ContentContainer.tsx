import React from "react";

interface ContentContainerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

function ContentContainer(props: ContentContainerProps) {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center">{props.title}</h1>
        <p className="text-sm text-gray-600 text-center">{props.description}</p>
      </div>
      <div className="mt-8">{props.children}</div>
    </div>
  );
}

export default ContentContainer;
