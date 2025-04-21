import React from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  return <div>Hello {params.id}</div>;
};

export default Meeting;
