import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between px-8 py-4 text-xl font-semibold text-[#2699fb]">
      <Link to="/">APP NAME</Link>
      <nav className="flex w-1/4 justify-between text-base font-normal">
        <Link to="/">HOME</Link>
        <Link to="/roles">ROLES</Link>
        <Link to="/">QUESTIONS</Link>
      </nav>
    </header>
  );
}
