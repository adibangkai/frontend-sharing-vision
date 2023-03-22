import Link from "next/link";

const Navbar = () => {
  return (
    <div className="tabs my-4">
      <Link href={"/home"} className="tab font-light text-xl">
        Article
      </Link>
      <Link href={"/dashboard"} className="tab font-light text-xl">
        Dashboard
      </Link>
    </div>
  );
};
export default Navbar;
