import { Link } from "react-router-dom";
import LeafIcon from "../icons/LeafIcon";

export default function Header() {
  return (
    <header className="flex justify-between px-8 py-4 text-xl font-semibold">
      <Link to="/" className="flex items-center whitespace-nowrap">
        <div className="text-accent mr-2 inline-block h-full align-middle">
          <LeafIcon />
        </div>
        GreenSprout
      </Link>
      <nav className="flex w-1/4 items-center justify-between text-xs font-normal md:text-sm">
        <Link to="/">HOME</Link>
        <Link to="/roles">ROLES</Link>
        <Link to="/">QUESTIONS</Link>
      </nav>
    </header>
  );
}
