import { Link } from "react-router-dom";
import LeafIcon from "../icons/LeafIcon";

export default function Header() {
  return (
    <header className="flex justify-between px-4 py-2 text-xl font-semibold md:px-8 md:py-4">
      <Link to="/" className="flex items-center whitespace-nowrap">
        <div className="text-accent mr-2 inline-block h-full align-middle">
          <LeafIcon />
        </div>
        GreenSprout
      </Link>
      <nav className="flex max-w-96 items-center justify-between gap-4 text-xs font-normal md:gap-8 md:text-sm">
        <Link to="/">Home</Link>
        <Link to="/roles">Select Role</Link>
        <Link to="/quiz">View Questions</Link>
      </nav>
    </header>
  );
}
