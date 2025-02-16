import React from 'react';
import VideoReel from '@/components/VideoReel';
import Videos from '@/constants/Videos';

// Sample data with placeholder videos and product info

const Home = () => {
  console.log(Videos)
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
    {Videos.map((video) => (
      <div
        key={video.id}
        className="snap-start h-screen flex justify-center items-center"
      >
        {/* On mobile max width is 400px, on desktop we increase it */}
        <div className="w-full max-w-[400px] md:max-w-[600px] h-full p-4 rounded-lg overflow-hidden bg-black">
          <VideoReel {...video} />
        </div>
      </div>
    ))}
  </div>
  );
};

export default Home;
