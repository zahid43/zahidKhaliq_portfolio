import {
  Expertise,
  Hero,
  Endorsements,
  Contacts,
  Footer,
  Experience,
  Certifications,
  Projects,
  DarkModeToast,
  TechStack,
} from "@/components/HomePage";

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
      {/* <TechStack />
      <Divider /> */}
      <Experience />
      <Divider />
      <Certifications />
      <Divider />
      <Projects />
      <Divider />
      <Endorsements />
      <Divider />
      <Contacts />
      <Footer />
      <DarkModeToast />
    </>
  );
}
