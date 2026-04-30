import SecondaryCard from "./SecondaryCard";

const hireMeData = [
  {
    title: "Try me out, risk free!",
    para: "If you're not happy with the design after the first draft, I'll refund your deposit, no questions asked",
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
          bgUpdate="bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900"
          backBox="bg-teal-400"
          cardHeight="min-h-90"
          cardPadding="px-30"
        />
      </section>
    </>
  );
}
