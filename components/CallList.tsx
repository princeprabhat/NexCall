"use client";

import { useGetCalls } from "@/hooks/useGetCalls";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { useToast } from "@/hooks/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData: CallRecording[][] = await Promise.all(
        callRecordings.map(async (meeting) => {
          try {
            const result = await meeting.queryRecordings();

            const recordings = ((
              result as unknown as { recordings?: CallRecording[] }
            )?.recordings ?? []) as CallRecording[];

            return recordings;
          } catch {
            toast({ title: "Please try again later" });
            return [] as CallRecording[];
          }
        })
      );

      const record: CallRecording[] = callData
        .filter((call) => call.length > 0)
        .flatMap((call) => call);

      setRecordings(record);
    };
    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  const checkCallType = (meeting: Call | CallRecording): meeting is Call => {
    return "state" in meeting;
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id || crypto.randomUUID()}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 26) ||
              (meeting as CallRecording)?.filename?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              // check meeting is a Call or Recording
              checkCallType(meeting)
                ? String(meeting.state?.startsAt?.toLocaleString())
                : String(meeting.start_time.toLocaleString())
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
