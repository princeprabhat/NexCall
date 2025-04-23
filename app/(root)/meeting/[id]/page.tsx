import React from "react";

type PageProps = {
  params: {
    id: string;
  };
};

const Meeting = ({ params }: PageProps) => {
  return <div>Hello {params.id}</div>;
};

export default Meeting;
