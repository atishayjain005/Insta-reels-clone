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
          {/* Phone-like container */}
          <div className="w-full max-w-[400px] h-full p-4 rounded-lg overflow-hidden bg-black">
            <VideoReel {...video} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
