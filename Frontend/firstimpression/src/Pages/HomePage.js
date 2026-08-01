import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/HomePage/Hero";
import SplashScreen from "../Components/HomePage/SplashScreen";
import Template from "../Components/HomePage/Template";
import AdvertisementVideo from "../Components/HomePage/AdvertisementVideo";
import CallToAction from "../Components/HomePage/CallToAction";
import Footer from "../Components/Footer";

export default function HomePage() {
  const [isSplashFinished, setIsSplashFinished] = useState(
    () => sessionStorage.getItem("hasSeenSplash") === "true"
  );

  return (
    <>
      <SplashScreen onComplete={() => setIsSplashFinished(true)} />
      <Navbar isSplashFinished={isSplashFinished} />
      <Hero isSplashFinished={isSplashFinished} />
      {isSplashFinished && (
        <>
          <Template />
          <AdvertisementVideo />
          <CallToAction />
          <Footer />
        </>
      )}
    </>
  );
}