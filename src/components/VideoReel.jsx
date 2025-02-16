"use client";
import React, { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoChatbubbleOutline, IoPaperPlaneOutline } from "react-icons/io5";
import { BiPlay, BiVolumeMute, BiVolume } from "react-icons/bi";

export default function VideoReel({
  id,
  url,
  channel,
  description,
  likes,
  shares,
  comment,
  productTag,
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [shareActive, setShareActive] = useState(false);
  const [showProductTag, setShowProductTag] = useState(false);
  const videoRef = useRef(null);

  // Update current time for progress bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  // IntersectionObserver: auto-play, pause, and reset video when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              // Reset the video to start over when it comes into view
              videoRef.current.currentTime = 0;
              videoRef.current
                .play()
                .catch((error) => {
                  if (error.name !== "AbortError") console.error(error);
                });
              setIsPlaying(true);
              if (productTag) {
                setTimeout(() => setShowProductTag(true), 500);
              }
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
              setShowProductTag(false);
            }
          }
        });
      },
      { threshold: 0.75 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [productTag]);

  // Toggle play/pause on video tap
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          if (error.name !== "AbortError") console.error(error);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle like state (filled vs outline heart)
  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    }
  };

  // Toggle follow state (Follow/Following)
  const handleFollow = (e) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  // Toggle mute/unmute using functional update to avoid stale state
  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      setIsMuted((prev) => {
        videoRef.current.muted = !prev;
        return !prev;
      });
    }
  };

  // Handle share button click using Web Share API if available
  const handleShareClick = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this video on Toastd!",
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => {
          // Ignore errors if share is cancelled
          if (
            error.name === "AbortError" ||
            error.message.toLowerCase().includes("cancel")
          ) {
            // Do nothing on share cancel
          } else {
            console.error("Error sharing", error);
          }
        });
    } else {
      setShareActive(true);
      setTimeout(() => setShareActive(false), 1000);
    }
  };

  // Prevent propagation for buttons that should not toggle play
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="relative w-full h-full" onClick={togglePlay}>
      {/* Center overlay play icon (visible when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <BiPlay size={80} className="text-white opacity-75" />
        </div>
      )}

      <video
        id={id}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        loop
        ref={videoRef}
        src={url}
        controls={false}
        muted={isMuted}
        autoPlay
      />

      {/* Mute/Unmute button (bottom right) */}
      <div className="absolute bottom-4 right-4">
        <button onClick={toggleMute} className="text-white text-2xl">
          {isMuted ? <BiVolumeMute /> : <BiVolume />}
        </button>
      </div>

      {/* Right side action icons */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleLikeClick}
        >
          {isLiked ? (
            <AiFillHeart size={32} className="text-red-500" />
          ) : (
            <AiOutlineHeart size={32} className="text-white" />
          )}
          <span className="text-white text-sm">{likeCount}</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={stopPropagation}
        >
          <IoChatbubbleOutline size={32} className="text-white" />
          <span className="text-white text-sm">{comment}</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleShareClick}
        >
          <IoPaperPlaneOutline size={32} className="text-white" />
          <span className="text-white text-sm">
            {shareActive ? "Shared!" : shares}
          </span>
        </div>
      </div>

      {/* Bottom overlay: channel info, follow button, and scrolling description */}
      <div className="absolute left-4 bottom-8 flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          {/* Circular avatar placeholder (first letter of channel) */}
          <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
            <span className="text-white text-lg">
              {channel?.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-white text-lg">{channel}</span>
          <button
            onClick={handleFollow}
            className={`px-3 py-1 rounded text-sm ${
              isFollowing ? "bg-red-500 text-white" : "bg-white text-black"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
        <Marquee className="text-white text-sm" gradient={false}>
          {description}
        </Marquee>
      </div>

      {/* Product Tag Overlay with animation */}
      {/* {productTag && showProductTag && (
        <Link
          href={productTag.url}
          className="absolute bg-white bg-opacity-80 px-3 py-1 rounded transition-transform duration-300 hover:scale-105 animate-fade-in-up"
          style={{ top: productTag.top, left: productTag.left }}
        >
          {productTag.name}
        </Link>
      )} */}

      {/* Progress bar at the very bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="w-full bg-gray-300 h-1">
          {videoRef.current && videoRef.current.duration > 0 && (
            <div
              className="bg-red-500 h-1"
              style={{
                width: `${(currentTime / videoRef.current.duration) * 100}%`,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
