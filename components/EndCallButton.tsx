"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const EndCallButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const handleEnd = async () => {
    try {
      await call?.camera.disable();
      await call?.microphone.disable();

      const devices = await navigator.mediaDevices.enumerateDevices();

      if (devices.length) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    } catch (error) {
      toast({ title: "Error leaving call" });
      console.error(error);
    } finally {
      await call?.endCall();
      router.push("/");
    }
  };

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call?.state.createdBy.id;
  if (!isMeetingOwner) return null;
  return (
    <Button onClick={handleEnd} className="bg-red-500">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
