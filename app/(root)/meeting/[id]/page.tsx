import React from "react";

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

const Meeting = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <div>Hello {id}</div>;
};

export default Meeting;
