import Hero from "@/components/Hero";

const Divider = () => <div className="dashed-border w-full" />

export default function Home() {
  return (
    <>
      <Divider />
      <Hero />
      <Divider />
    </>
  );
}
