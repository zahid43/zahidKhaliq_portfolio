import Expertise from "@/components/HomePage/Expertise";
import Hero from "@/components/HomePage/Hero";
import Endorsements from "@/components/HomePage/Endorsements";
import HireMe from "@/components/HomePage/HireMe";
import Contacts from "@/components/HomePage/Contacts";

const Divider = () => <div className="dashed-border w-full" />

export default function Home() {
  return (
    <>
      <Divider />
      <Hero />
      <Divider />
      <Expertise />
      <Endorsements />
      <HireMe />
      <Contacts />
    </>
  );
}
