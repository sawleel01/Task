import React from "react";
import Scroll from "@/components/Scroll";

const Home = () => {
  return (
    <main className="w-screen">
      <Scroll start={1} end={20} direction="vertical" />

      <Scroll start={21} end={30} direction="horizontal" />

      <Scroll start={31} end={50} direction="vertical" />
    </main>
  );
};

export default Home;
