import Image from "next/image";
import AvatarGraphic from "@/components/AvatarGraphic";

export default function Hero() {
  return (
    <>
      <section className="relative h-200">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full overflow-hidden opacity-50">
          <Image src="/images/graphics01.svg" alt="Hero" width={1920} height={1080} />
        </div>
        <div className="hero-gradient"></div>
        <div className="container h-full">
          <div className="grid grid-cols-[1fr_1px_1fr] z-1 relative h-full">
            <div className="grid place-items-center">
              <div>
                <h1>HEY! I'm Zahid Khaliq, Frontend Engineer</h1>
                <p>I'm a Frontend Engineer with 4+ years of experience in creating user-centered digital products. I specialize in web and mobile app design, and I'm passionate about creating intuitive and engaging user experiences.</p>
                <button>Contact me</button>
              </div>
            </div>
            <div className="dashed-border-right">
            </div>
            <div className="grid place-items-center">
              <div className=" relative">
                <div className="absolute top-0 left-0 w-130 h-130">
                  <div className="bg-blue-500 w-14 h-14 rounded-2xl absolute top-14 left-5 rotate-45 animate-spin [animation-duration:10s]"></div>
                  <AvatarGraphic className="w-11/12 mt-25 ml-8" />
                  <div className="bg-purple-500 w-14 h-14 rounded-2xl absolute bottom-14 right-5 rotate-45 animate-spin [animation-duration:5s]"></div>
                </div>
                <div className="circle w-130 h-130 rounded-full bg-[#d2d5f4]"></div>
                <div className="absolute -top-20 left-0 w-130 overflow-hidden rounded-b-full" style={{ height: "calc(100% + 5rem)" }}>
                  <Image src="/images/zahidTransparent.png" alt="Zahid Khaliq" fill style={{ objectFit: "contain", objectPosition: "bottom center" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
