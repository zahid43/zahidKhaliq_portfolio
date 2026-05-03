import SecondaryCard from "./SecondaryCard";

const hireMeData = [
  {
    title: "Hire Me",
    para: "Let's Work Together",
    button: "Contact me",
    link: "/",
  },
];

export default function HireMe() {
  return (
    <>
      <section className="container my-30">
        <SecondaryCard
          heading={hireMeData[0].title}
          desc={hireMeData[0].para}
          btnText={hireMeData[0].button}
          Blink={hireMeData[0].link}
          bgUpdate="bg-gradient-to-br from-[#07021a] via-[#13065e] to-[#0a1a50]"
          backBox="bg-gradient-to-br from-teal-500 via-indigo-600 to-violet-700"
          cardHeight="min-h-90"
          cardPadding="px-6 md:px-12 lg:px-30"
        />
      </section>
    </>
  );
}
