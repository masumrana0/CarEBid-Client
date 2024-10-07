import LandingHomePage from "@/components/publicComponents/home/Page";
import Navbar from "@/components/publicComponents/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarEBid || Home ",
  description: "CarEBid Home Page",
};
const HomePage = () => {

  return (
    <main className="px-10">
      <Navbar />
      <LandingHomePage />
    </main>
  );
};

export default HomePage;
