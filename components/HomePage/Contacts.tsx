import Image from "next/image";
import Link from "next/link";
import SecondaryCard from "./SecondaryCard";

const contactLinks = [
  {id: "in", title: "My linkedin" , link: "/", customClass: ""},
  {id: "resume", title: "My Resume" , link: "/", customClass: " bg-purple-900"},
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
                <Link 
                  key={i.id} 
                  href={i.link} 
                  className={`${i.customClass} bg-cyan-950 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-300`}
                >
                  {i.title}
                </Link>
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
