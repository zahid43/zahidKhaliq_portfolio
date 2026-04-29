import SecondaryCard from "./SecondaryCard";
import CustomButton from "./CustomButton";

const contactLinks = [
  { id: "linkedin", title: "My linkedin", customClass: "bg-purple-900 hover:bg-purple-900/80" },
  { id: "resume", title: "My Resume", customClass: "" },
];

const cardSecData = [
  {
    id: "card_1",
    heading: "Try me out, risk Free!",
    desc: "Lets build some great together.",
    linkText: "Contact Me",
    Blink: "/",
  },
];

export default function Contacts() {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 gap-3">
          <div className="leftSection">
            <h4>Lets build it together.</h4>
            <div className="flex gap-3 mt-5">
              {contactLinks.map((i) => (
                <CustomButton
                  key={i.id}
                  textClassName={i.customClass}
                >
                  {i.title}
                </CustomButton>
              ))}
            </div>
          </div>
          <div className="rightSection">
            <SecondaryCard
              id={cardSecData[0].id}
              heading={cardSecData[0].heading}
              desc={cardSecData[0].desc}
              linkText={cardSecData[0].linkText}
              Blink={cardSecData[0].Blink}
            />
          </div>
        </div>
      </div>
    </>
  );
}
