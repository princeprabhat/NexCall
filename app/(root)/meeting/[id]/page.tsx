"use client";

import { use, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import Loader from "@/components/Loader";

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
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  // changed user here
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
