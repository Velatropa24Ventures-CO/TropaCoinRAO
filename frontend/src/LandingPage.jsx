import React from "react";
import tropacoin from "./assets/TropaCoinImage.png";
import sunrise from "./assets/VelatropaSunriseBackground.jpg";
import mail from "./assets/mailIcon.png";
import "./styles/landing-animations.css"; 

const LandingPage = () => {
  return (
    // outer wrapper
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={sunrise}
        alt="Sunrise background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Semi-opaque indigo overlay above the image */}
      <div className="absolute inset-0 bg-[#090030]/70 z-10" />

      {/* Content wrapper above the overlay */}
      <div className="relative z-20 min-h-screen flex flex-col">
        {/* Top blue bar */}
        <div className="w-full bg-[#1F4D98]">
          <div className="container mx-auto px-6 h-[40px] sm:h-[44px] flex items-center justify-between">
            {/* Left side: mail icon + email */}
            <div className="flex items-center gap-2 text-white text-[14px] sm:text-[16px] font-montserrat">
              <img src={mail} alt="Mail icon" className="w-5 h-5" />
              <span>hello@tropacoinrao.energy</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-white text-[14px] sm:text-[16px] opacity-90 hover:opacity-100 hover:underline font-montserrat"
              >
                Sign Up
              </button>
              <span className="text-white hidden sm:inline">|</span>
              <button
                type="button"
                className="text-white text-[14px] sm:text-[16px] opacity-90 hover:opacity-100 hover:underline font-montserrat"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

       {/* Purple bar — robust layout */}
        <div className="w-full h-[90px] bg-[#090030]">
          <div className="container mx-auto px-6 h-full flex items-center">
            {/* Brand: won't wrap */}
            <div className="text-white text-[20px] sm:text-[24px] md:text-[28px] font-semibold font-montserrat whitespace-nowrap">
              V24V's Commons-Backed Crypto
            </div>

            {/* Nav pushed to the right */}
            <div className="ml-auto hidden md:flex gap-[48px] items-center">
              <button className="text-white text-[18px] hover:underline">Home</button>
              <button className="text-white text-[18px] hover:underline">White Paper</button>
            </div>

            {/* small-screen menu fallback */}
            <div className="md:hidden ml-auto">
              <button className="text-white text-sm">Menu</button>
            </div>
          </div>
        </div>


        {/* Main content area */}
        <div className="container mx-auto px-6 pt-7 pb-12 relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Heading */}
          <section className="lg:col-span-7 xl:col-span-6">
            <h1
              className="text-white text-[36px] sm:text-[44px] md:text-[48px] lg:text-[48px] font-bold leading-tight text-left font-montserrat fade-slide"
            >
              Welcome To
              <br />
              TropaCoinRAO
            </h1>

            {/* Subheading */}
            <p
              className="text-gray-400 italic text-[18px] sm:text-[22px] mt-2 text-left max-w-3xl font-montserrat fade-slide"
            >
              Invest in the future of trade with community- <br />
              powered Tropacoins.
            </p>

            {/* Section heading */}
            <h2
              className="text-white text-[26px] sm:text-[30px] font-semibold mt-8 text-left font-montserrat fade-slide"
            >
              What are TropaCoins?
            </h2>

            {/* Description */}
            <p
              className="text-gray-400 italic text-[16px] sm:text-[18px] mt-2 text-left max-w-3xl font-montserrat fade-slide"
            >
              TropaCoins (TPACO) are digital tokens that reimagine how money works.
              Instead of sitting idle, they’re designed to circulate—supporting people,
              families, and projects when it’s needed most.<br />
              With TropaCoins, investing becomes a way to create value for both community and future growth.
            </p>
          </section>

          {/* Right column - image + CTA (flow-based centering) */}
          <aside className="lg:col-span-5 xl:col-span-6 relative flex flex-col justify-center items-center lg:items-end lg:pr-8">
            {/* Image (animated) */}
            <img
              src={tropacoin}
              alt="TropaCoin"
              className="w-56 sm:w-72 md:w-80 lg:w-[300px] h-auto z-30 mb-6 lg:mb-8 fade-slide"
            />

            {/* Call to action block (animated) */}
            <div
              className="flex flex-col items-center lg:items-end gap-3 max-w-xs text-center lg:text-right fade-slide-button"
            >
              <p
                className="text-gray-400 text-[16px] italic text-center max-w-3xl pr-0 font-montserrat"
              >
                Support the launch. Join Series A <br />
                and  pick your TropaCoin Path as an <br />
                Angel Investor, Patron Investor or <br /> 
                Family Investor.
              </p>

              <button
                className="bg-[#1F4D98] text-white px-8 py-3 rounded-md text-[16px] font-semibold hover:bg-[#173d78] transition duration-300 font-montserrat lg:-translate-x-16 transform"
              >
                Get Started
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
