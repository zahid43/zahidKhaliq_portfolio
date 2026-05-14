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
  Services,
  CTABanner,
  LatestPosts,
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
      <Services />
      <Divider />
      <Experience />
      <Divider />
      <Certifications />
      <Divider />
      <Projects />
      <Divider />
      <LatestPosts />
      <CTABanner />
      <Endorsements />
      <Divider />
      <Contacts />
      <Footer />
      <DarkModeToast />
    </>
  );
}
