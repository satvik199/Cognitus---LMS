import React from "react";
import { assets } from "../../assets/assets";

const Hero = () => {
  return (
   
    <div className="flex flex-col items-center justify-center w-full md:pt-32 pt-20 px- md:px-0 space-y-4 text-center bg-gradient-to-b from-cvar-100/70">
        <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
        Where Ambition Takes Flight:
<span className="text-blue-600"> Find Your Course.</span>

          <img
            src={assets.sketch}
            alt="sketch"
            className="md:block hidden absolute -bottom-8 right-0"
          />
        </h1>

            {/* Added padding-top and padding-bottom for spacing */}
            <p className="text-base sm:text-sm md:text-md text-gray-500 max-w-2xl mx-auto py-2">
            Discover a range of expert-led courses tailored to your goals.  
Learn at your own pace and turn your passion into real-world skills.

        </p>
      </div>

    
  );
};

export default Hero;
