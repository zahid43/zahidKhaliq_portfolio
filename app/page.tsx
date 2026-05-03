import Expertise from "@/components/HomePage/Expertise";
import Hero from "@/components/HomePage/Hero";
import Endorsements from "@/components/HomePage/Endorsements";
import Contacts from "@/components/HomePage/Contacts";
import Footer from "@/components/HomePage/Footer";
import Experience from "@/components/HomePage/Experience";
import Projects from "@/components/HomePage/Projects";
import DarkModeToast from "@/components/HomePage/DarkModeToast";

const Divider = () => (
  <div className="container">
    <div className="h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />
  </div>
)

export default function Home() {
  return (
    <>
      <Divider />
      <Hero />
      <Divider />
      <Expertise />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      <Endorsements />
      <Contacts />
      <Footer />
      <DarkModeToast />
    </>
  );
}
