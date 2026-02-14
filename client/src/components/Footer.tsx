import GithubIcon from "../icons/GithubIcon";

export default function Footer() {
  return (
    <footer className="bg-footer mt-auto flex items-center justify-between px-8 py-4 text-white">
      Chingu Voyage 59 Team 35
      <div className="flex items-center justify-between gap-8">
        <GithubIcon />
        Credits
      </div>
    </footer>
  );
}
