import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <div className="container">
        <nav className="flex justify-between items-center py-3">
          <Image src="/images/logo/zahidkhaliq.svg" alt="Logo" width={200} height={50} />
          <ul className="flex gap-18">
            <li>Home</li>
            <li>About me</li>
            <li>Projects</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </>
  );
}
