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
      {/* <h2 className="my-5 font-extrabold">Home page is comming soon.....</h2> */}


    </main>
  );
};

export default HomePage;
