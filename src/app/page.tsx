 
import Navbar from "@/components/publiclayout/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CarEBid || Home ",
  description: "CarEBid Home Page",
};
const HomePage = () => {
  return (
    <main className="px-10">
      <Navbar />
       
    </main>
  );
};

export default HomePage;
