import SecondaryCard from "./SecondaryCard";
import CustomButton from "./CustomButton";
import LinkedinIcon from "@/components/ReusableSvgs/LinkedinIcon";
import { FileText } from "lucide-react";

const cardSecData = [
  {
    heading: "Try me out, risk Free!",
    desc: "Lets build some great together.",
    btnText: "Contact Me",
    Blink: "/",
  },
];

export default function Contacts() {
  return (
    <>
      <section className="container my-10">
        <div className="grid grid-cols-2 gap-3">
          <div className="leftSection">
            <h4>Lets build it together.</h4>
            <div className="flex gap-3 mt-5">
              <CustomButton textClassName="flex items-center gap-2 bg-[#0A66C2]">
                <LinkedinIcon width={18} height={18} aria-hidden="true" />
                My LinkedIn
              </CustomButton>
              <CustomButton textClassName="flex items-center gap-2 bg-violet-600">
                <FileText size={18} aria-hidden="true" />
                My Resume
              </CustomButton>
            </div>
          </div>
          <div className="rightSection">
            <SecondaryCard
              heading={cardSecData[0].heading}
              desc={cardSecData[0].desc}
              btnText={cardSecData[0].btnText}
              Blink={cardSecData[0].Blink}
            />
          </div>
        </div>
      </section>
    </>
  );
}
