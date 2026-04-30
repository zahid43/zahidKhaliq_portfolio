import Expertise from "@/components/HomePage/Expertise";
import Hero from "@/components/HomePage/Hero";
import Endorsements from "@/components/HomePage/Endorsements";
import HireMe from "@/components/HomePage/HireMe";
import Contacts from "@/components/HomePage/Contacts";
import Footer from "@/components/HomePage/Footer";

const Divider = () => <div className="dashed-border w-full" />

export default function Home() {
  return (
    <>
      <Divider />
      <Hero />
      <Divider />
      <Expertise />
      <Divider />
      <Endorsements />
      <HireMe />
      <Contacts />
      <Divider />
      <Footer />
    </>
  );
}
