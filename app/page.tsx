import Expertise from "@/components/HomePage/Expertise";
import Hero from "@/components/HomePage/Hero";

const Divider = () => <div className="dashed-border w-full" />

export default function Home() {
  return (
    <>
      <Divider />
      <Hero />
      <Divider />
      <Expertise />
    </>
  );
}
