import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/HomePage/Hero";
import SplashScreen from "../Components/HomePage/SplashScreen";

export default function HomePage() {
  const [isSplashFinished, setIsSplashFinished] = useState(
    () => sessionStorage.getItem("hasSeenSplash") === "true"
  );

  return (
    <>
      <SplashScreen onComplete={() => setIsSplashFinished(true)} />
      <Navbar isSplashFinished={isSplashFinished} />
      <Hero isSplashFinished={isSplashFinished} />
    </>
  );
}