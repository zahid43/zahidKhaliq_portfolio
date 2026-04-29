import { Logo } from "@/components/ReusableSvgs";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <>
      <div className="container">
        <nav className="flex justify-between items-center py-3">
          <Logo width={200} height={50} className="text-purple-500" />
          <ul className="flex gap-18 items-center">
            <li>Home</li>
            <li>About me</li>
            <li>Projects</li>
            <li>Contact</li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
