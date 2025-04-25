"use client";

import { use, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";

// type PageProps = {
//   params: {
//     id: string;
//   };
// };

// interface MeetingProps {
//   params: { id: string };
// }

const Meeting = ({ params }: { params: Promise<{ id: string }> }) => {
  const [isSetupComplete, setIsSetupComplete] = useState<boolean>(false);
  const { id } = use(params);
  const { user, isLoaded } = useUser();
  return (
    <main className="h-screen w-full">
      <StreamCall>
        <StreamTheme>
          {!isSetupComplete ? "MeetingSetup" : "MeetingRoom"}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
