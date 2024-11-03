import Link from "next/link";

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link href={"/"}>
      <h3 className="font-extrabold tracking-tighter text-xl md:text-2xl xl:text-3xl">
        Car<span className="text-green-500">E</span>Bids
      </h3>
    </Link>
  );
};

export default Logo;
