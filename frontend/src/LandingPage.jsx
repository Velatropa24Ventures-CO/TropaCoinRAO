import React from "react";
import tropacoin from "./assets/TropaCoinImage.png";
import sunrise from "./assets/VelatropaSunriseBackground.jpg";
import mail from "./assets/mailIcon.png";
import "./styles/landing-animations.css"; 

const LandingPage = () => {
  return (
    // outer wrapper
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={sunrise}
        alt="Sunrise background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Semi-opaque indigo overlay above the image */}
      <div className="absolute inset-0 bg-[#090030]/70 z-10" />

      {/* Content wrapper above the overlay */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Top blue bar */}
        <div className="w-full h-[40px] bg-[#1F4D98]">
          <div className="container mx-auto px-6 h-full flex items-center">
            {/* Left side: mail icon + email */}
            <div className="flex items-center gap-2 text-white text-[16px] font-montserrat">
              <img src={mail} alt="Mail icon" className="w-5 h-5" />
              <span>hello@velatropa24ventures.art</span>
            </div>

            <div className="ml-[1100px] flex items-center gap-4">
              <button
                type="button"
                className="text-white text-[16px] opacity-90 hover:opacity-100 hover:underline font-montserrat"
              >
                Sign Up
              </button>
              <span className="text-white">|</span>
              <button
                type="button"
                className="text-white text-[16px] opacity-90 hover:opacity-100 hover:underline font-montserrat"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Purple bar directly below the blue bar */}
        <div className="w-full h-[90px] bg-[#090030]">
          <div className="container mx-auto px-6 h-full flex items-center">
            {/* Left: brand */}
            <div className="text-white text-[32px] font-semibold font-montserrat">
              Velatropa24VenturesCO
            </div>

            {/* Buttons next to brand */}
            <div className="ml-[780px] flex gap-[80px] items-center">
              <button
                type="button"
                className="text-white text-[22px] opacity-90 hover:opacity-100 hover:underline font-montserrat"
              >
                Home
              </button>

              <button
                type="button"
                className="text-white text-[22px] opacity-90 hover:opacity-100 hover:underline font-montserrat"
              >
                White Paper
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="pl-16 pt-7 relative flex-1">
          {/* Heading */}
          <h1
            className="text-white text-[48px] font-bold leading-tight text-left font-montserrat fade-slide"
          >
            Welcome To
            <br />
            TropaCoinRAO
          </h1>

          {/* Subheading */}
          <p
            className="text-gray-400 italic text-[24px] mt-2 text-left max-w-3xl font-montserrat fade-slide"
          >
            Invest in the future of trade with community- <br />
            powered Tropacoins.
          </p>

          {/* Section heading */}
          <h2
            className="text-white text-[32px] font-semibold mt-20 text-left font-montserrat fade-slide"
          >
            What are TropaCoins?
          </h2>

          {/* Description */}
          <p
            className="text-gray-400 italic text-[22px] mt-2 text-left max-w-3xl font-montserrat fade-slide"
          >
            TropaCoins (TPACO) are digital tokens that reimagine how money works.{" "}
            <br />
            Instead of sitting idle, they’re designed to circulate—supporting people,{" "}
            <br />
            families, and projects when it’s needed most. With TropaCoins, investing{" "}
            <br />
            becomes a way to create value for both community and future growth.
          </p>

          {/* Image (animated) */}
          <img
            src={tropacoin}
            alt="TropaCoin"
            className="fixed bottom-[230px] right-[100px] w-[300px] h-auto z-30 fade-slide"
          />

          {/* Call to action block (animated) */}
          <div
            className="fixed bottom-[70px] right-[80px] flex flex-col items-end gap-3 fade-slide"
          >
            <p
              className="text-gray-400 text-[20px] italic text-center max-w-3xl pr-6 font-montserrat"
            >
              Support the launch. Join Series A <br />
              and pick your TropaCoin Path.
            </p>

            <button
              className="bg-[#1F4D98] text-white px-28 py-5 rounded-md text-[20px] font-semibold hover:bg-[#173d78] transition duration-300 font-montserrat fade-slide-button"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
