"use client";
import React, { useEffect } from "react";
import VideoReel from "@/components/VideoReel";
import Videos from "@/constants/Videos";

export default function Home() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div
      className="overflow-y-scroll snap-y snap-mandatory"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      {Videos.map((video) => (
        <div
          key={video.id}
          className="snap-start flex justify-center items-center"
          style={{ height: "calc(var(--vh, 1vh) * 100)" }}
        >
          {/* On mobile max width is 400px; on desktop we increase it */}
          <div className="w-full max-w-[400px] md:max-w-[600px] h-full p-4 rounded-lg overflow-hidden bg-black">
            <VideoReel {...video} />
          </div>
        </div>
      ))}
    </div>
  );
}
